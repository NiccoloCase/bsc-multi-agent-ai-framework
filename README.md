# Designing Self-Aware Multi-Agent AI Systems: A Two-Fold Framework Based on AIBOM and Reflective Architecture

> 📦 The Cognitive Workflow Framework is actively maintained at the repository: [github.com/ncaselli/self-aware-multi-agent-ai](https://github.com/NiccoloCase/cognitive-workflow)

**Candidate**: Niccolò Caselli  
**Supervisor**: Prof. Enrico Vicario  
**Co-supervisor**: Marco Becattini  
**Institution**: Università degli Studi di Firenze  
**Department**: School of Engineering – Department of Information Engineering  
**Degree Program**: Bachelor’s Degree in Computer Engineering  
**Academic Year**: 2024/2025

---

📄 Download the full thesis manuscript: [`supplementary-materials/thesis/document.pdf`](./supplementary-materials/thesis/document.pdf)

---

## Abstract

The increasing complexity of modern AI systems—especially those based on large language models (LLMs) and multi-agent architectures—demands new methodologies to ensure system-level reliability, traceability, and adaptability. Existing tools offer limited visibility into software and knowledge dependencies, leaving a gap in accountable and maintainable cognitive workflows. This thesis addresses that gap by proposing a two-fold framework combining the Reflection architectural pattern with an extended notion of the Software Bill of Materials (SBOM), adapted for AI systems as the Artificial Intelligence Bill of Materials (AIBOM). This novel integration—largely unexplored in current literature—enables runtime adaptability and structured traceability. The architecture features a knowledge layer managing workflow meta-models and an operational layer for task execution. Reflection supports semantic interoperability across heterogeneous components whose interactions are not predefined. A use case in AI for Network Engineering (AI4NE) and Network Engineering for AI (NE4AI) demonstrates how cognitive workflows dynamically route requests across cloud resources based on evolving constraints (e.g., latency, energy efficiency, and computational cost). This work opens several research directions and lays the groundwork for further investigation into structured multi-agent architectures and their alignment with forthcoming AI governance regulations.

---

## Repository Structure

```
├── source/                    # Java source code of the implemented system
├── thesis/                    # LaTeX source files of the academic thesis
├── supplementary-materials/  # Tools, results, and images used in the experimentation
│   ├── langchain-vs-springai/ # Materials for the comparison in Appendix B
│   └── images/                # Diagrams and figures from the thesis
```

The `supplementary-materials` folder contains both the tools and the results used for the experimentation phase. In particular, it includes the materials used in **Appendix B** of the thesis, which compares **LangChain** and **Spring AI**, as well as all the **images and diagrams** used in the document.

---

## Project Overview

The project implements a reflective and self-aware AI system prototype based on:

* **Reflection Architectural Pattern**: for dynamic, runtime adaptability.
* **AI Bill of Materials (AIBOM)**: to ensure structured, transparent documentation of AI components.

This dual-layer architecture, derived from SALLMA, includes:

* **Knowledge Layer**: Meta-models for AI workflows and agent configurations.
* **Operational Layer**: Real-time execution and orchestration of cognitive workflows.

The solution aligns with emerging AI governance standards, supporting explainability, interoperability, and component reuse.

---

## Key Features

* **Dynamic Workflow Execution**: DAG-based workflows with reusable components.
* **Meta-Model-Driven Architecture**: Modularity and configurability via meta-catalogs.
* **Semantic Port System**: Input/output port abstraction and validation.
* **LLM Integration**:

  * Intent Detection
  * Input Variable Mapping
  * Port Schema Matching
* **AIBOM Management**: Structured recording of AI artifacts and workflow dependencies.
* **Runtime Self-Adaptation**: On-the-fly updates to workflows and agents.
* **Hybrid Search**: Supports retrieval of relevant meta-models.
* **Spring AI Integration**: Leverages modern Java-based AI tooling.

---

## Architecture Summary

### Knowledge Layer

* Stores and versions workflow, node, and intent meta-models.
* Enforced access via Meta-Object Protocol (MOP).
* Supports Hybrid Search and semantic querying.

### Operational Layer

* Instantiates and executes workflows using real-time context.
* Responds to meta-model updates and logs runtime events.
* Enables port adaptation and automatic workflow generation.

---

## Technologies

* Java (Spring Boot, Spring AI)
* MongoDB Atlas (NoSQL + Vector Search)
* OpenAI & Anthropic APIs
* WireMock (for integration test mocking)

---

## How to Run

1. Clone the repository.
2. Set API credentials and MongoDB URI in `.env` or `application.yml`.
3. Ensure MongoDB instance is running (Atlas or local).
4. Launch with your IDE or `mvn spring-boot:run`.
5. Test via Postman, CLI, or browser interface.

---

## Testing Summary

* **104 tests total**:

  * **48 Unit Tests**: Model validation, port logic.
  * **54 Integration Tests**: LLM calls, schema conversion, DB access.
  * **2 End-to-End Tests**: RAG workflows and adaptations.
* Includes real LLM API calls for schema and intent validation.

---

## Case Study: AI4NE / NE4AI

A practical demonstration shows cognitive workflow routing of AI tasks based on:

* User intent analysis
* Network and hardware constraints
* Real-time model selection from AIBOM
* Regulatory and security checks

Demonstrated benefits:

* Increased traceability and transparency
* Runtime fault tolerance and adaptability
* Compliance with AI governance mandates

---

## Future Work

* Deploy as distributed SALLMA architecture
* Improve AI-driven workflow synthesis and evaluation
* Add security layers: blockchain, ZK proofs, verifiable credentials
* Expand to new domains via domain-specific ontologies and AIBOM schemas
* Research on quantitative evaluations and knowledge subtraction scenarios.

---


## Authors

* Niccolò Caselli (Università degli Studi di Firenze)

## Supervisors

* Prof. Enrico Vicario
* Marco Becattini


