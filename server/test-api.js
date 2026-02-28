import http from "http";

async function testLogin() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      email: "admin@example.com",
      password: "admin123"
    });

    const options = {
      hostname: "localhost",
      port: 5000,
      path: "/api/auth/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length
      }
    };

    console.log("🔍 Testing login...");
    const req = http.request(options, (res) => {
      let responseData = "";
      res.on("data", (chunk) => {
        responseData += chunk;
      });
      res.on("end", () => {
        console.log("📝 Login Response Status:", res.statusCode);
        try {
          const parsed = JSON.parse(responseData);
          console.log("📝 Login Response:", JSON.stringify(parsed, null, 2));
          resolve(parsed);
        } catch (e) {
          console.log("📝 Raw Response:", responseData);
          reject(e);
        }
      });
    });

    req.on("error", (error) => {
      console.error("❌ Request error:", error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function testCreateClub(token) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      name: "Test Club " + Date.now(),
      description: "Test Description",
      category: "Technology"
    });

    const options = {
      hostname: "localhost",
      port: 5000,
      path: "/api/clubs",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Content-Length": data.length
      }
    };

    console.log("\n🔍 Testing club creation...");
    const req = http.request(options, (res) => {
      let responseData = "";
      res.on("data", (chunk) => {
        responseData += chunk;
      });
      res.on("end", () => {
        console.log("📝 Club Creation Response Status:", res.statusCode);
        try {
          const parsed = JSON.parse(responseData);
          console.log("📝 Club Creation Response:", JSON.stringify(parsed, null, 2));
          resolve(parsed);
        } catch (e) {
          console.log("📝 Raw Response:", responseData);
          reject(e);
        }
      });
    });

    req.on("error", (error) => {
      console.error("❌ Request error:", error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  try {
    const loginRes = await testLogin();
    if (loginRes.token) {
      console.log("\n✅ Login successful!");
      await testCreateClub(loginRes.token);
    } else {
      console.log("\n❌ Login failed - no token");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

main().then(() => {
  console.log("\n✅ Test completed");
  process.exit(0);
}).catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
