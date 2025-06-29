package org.caselli.comparativecognitiveworkflow.services;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ToolService {

    private final RestTemplate restTemplate;
    private final String EXTERNAL_API_BASE_URL = "http://localhost:8000";

    public ToolService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }



    public String fetchNetworkTopology() {
        // It is not marked as a tool as the routing tool itself returns the topology. So this service
        // is used only by the simple llm
        String url = EXTERNAL_API_BASE_URL + "/network_topology";
        return restTemplate.getForObject(url, String.class);
    }


    @Tool(description = "Get a list of hardware devices in a network and their technical specifications")
    public String fetchDevices() {
        String url = EXTERNAL_API_BASE_URL + "/devices";
        return restTemplate.getForObject(url, String.class);
    }



    @Tool(description = """
            Calculates a network route based on specified device constraints. 
            This function takes a list of device IDs and attempts to find a path through the network 
            that includes these devices. It find all possible paths 
            that meet the specified constraints.
           
            Returns: 
            {
                 "paths": [ <list of candidate paths>  ],
                 "constraints": <considered constraint nodes>,
                 "network_topology": {
                     "topology": {
                         "nodes": [
                             <list of nodes>
                         ],
                         "connections": [
                           <lust of edges>
                         ]
                     }
                 }
            }
            """)
    public String route(List<String> deviceIds) {
        String url = EXTERNAL_API_BASE_URL + "/route";
        DeviceConstraints constraints = new DeviceConstraints(deviceIds);
        return restTemplate.postForObject(url, constraints, String.class);
    }



    private record DeviceConstraints(List<String> device_ids) { }
}