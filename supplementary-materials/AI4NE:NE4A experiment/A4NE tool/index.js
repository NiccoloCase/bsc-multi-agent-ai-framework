import fetch from "node-fetch";
import fs from "fs/promises";
import path from "path";
import https from "https";
import networkDevices from "./network_devices.json" with { type: "json" };
import pdfParse from "pdf-parse";

// Create an agent that ignores SSL certificate errors
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

async function downloadPDF(url, filename, deviceName) {
  try {
    console.log(`Downloading: ${url}`);

    const fetchOptions = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    };

    if (url.includes("docs.qualcomm.com")) {
      fetchOptions.agent = httpsAgent;
    }

    if (url.includes("napatech.com")) {
      console.log(`⚠️  Skipping ${deviceName}: Access forbidden (403)`);
      return null;
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    await fs.writeFile(filename, Buffer.from(buffer));
    console.log(
      `✓ Saved PDF: ${filename} (${(buffer.byteLength / 1024).toFixed(1)} KB)`
    );
    return filename;
  } catch (error) {
    console.log(`✗ Failed to download ${deviceName}: ${error.message}`);
    return null;
  }
}

async function extractTextFromPDF(pdfFile) {
  pdfParse(dataBuffer).then(function (data) {
    console.log("Number of pages:", data.numpages);
    console.log("File size:", data.filesize);
    console.log("Extracted text:", data.text);
  });
}

async function pipeline(devices) {
  try {
    await fs.mkdir("downloads", { recursive: true });
    await fs.mkdir("extracted_text", { recursive: true });
  } catch (error) {}

  console.log("🚀 Starting Advanced PDF Processing Pipeline...\n");

  const results = [];

  for (let i = 0; i < devices.length; i++) {
    const device = devices[i];

    console.log(`\n${"=".repeat(60)}`);
    console.log(`📋 Processing ${i + 1}/${devices.length}: ${device.name}`);
    console.log(`🔗 URL: ${device.manual}`);
    console.log(`${"=".repeat(60)}`);

    try {
      const safeName = device.name
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^\w_]/g, "");

      const pdfFilename = path.join("downloads", `${safeName}.pdf`);
      const textFilename = path.join("extracted_text", `${safeName}.txt`);

      // Download PDF
      const downloadedFile = await downloadPDF(
        device.manual,
        pdfFilename,
        device.name
      );

      if (!downloadedFile) {
        results.push({
          device: device.name,
          status: "download_failed",
          url: device.manual,
        });
        continue;
      }

      // Extract text
      const text = await extractTextFromPDF(downloadedFile);

      // Save extracted text
      await fs.writeFile(textFilename, text);
      console.log(`💾 Saved to: ${textFilename}`);

      const isSuccess = !text.startsWith("[") || text.includes("extracted");

      results.push({
        device: device.name,
        status: isSuccess ? "success" : "partial",
        textLength: text.length,
        pdfFile: pdfFilename,
        textFile: textFilename,
      });
    } catch (error) {
      console.error(`💥 Error processing ${device.name}:`, error.message);
      results.push({
        device: device.name,
        status: "error",
        error: error.message,
      });
    }
  }

  // Print summary
  console.log(`\n${"=".repeat(70)}`);
  console.log(`📊 PROCESSING SUMMARY`);
  console.log(`${"=".repeat(70)}`);

  results.forEach((result, index) => {
    const icon =
      result.status === "success"
        ? "✅"
        : result.status === "partial"
        ? "⚠️"
        : "❌";

    console.log(`${icon} ${result.device}:`);
    console.log(`   Status: ${result.status}`);
    if (result.textLength) {
      console.log(`   Text: ${result.textLength} characters`);
    }
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
    console.log("");
  });

  const successful = results.filter((r) => r.status === "success").length;
  const partial = results.filter((r) => r.status === "partial").length;

  console.log(
    `🎯 Results: ${successful} successful, ${partial} partial, ${
      results.length - successful - partial
    } failed out of ${results.length} total`
  );
}

pipeline(networkDevices).catch(console.error);
