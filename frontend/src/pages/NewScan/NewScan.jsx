const startScan = async () => {

  setError("");

  // ==============================
  // VALIDATION
  // ==============================

  if (!projectName.trim()) {
    setError("Project Name is required.");
    return;
  }

  if (scanType === "website" && !websiteUrl.trim()) {
    setError("Website URL is required.");
    return;
  }

  if (scanType === "apk" && !apkFile) {
    setError("Please upload an APK file.");
    return;
  }

  let timer = null;

  try {

    setLoading(true);
    setProgress(0);
    setScanCompleted(false);
    setResult(null);

    // ==============================
    // PROGRESS ANIMATION
    // ==============================

    timer = setInterval(() => {

      setProgress((prev) => {

        if (prev >= 90) {
          clearInterval(timer);
          return 90;
        }

        return prev + 10;

      });

    }, 250);


    let response;


    // ==============================
    // WEBSITE SCAN
    // ==============================

    if (scanType === "website") {

      response = await api.post(
        "/website/scan",
        {
          url: websiteUrl.trim(),
          projectName: projectName.trim(),
          scanMode: scanMode
        }
      );

      const websiteData = response.data || {};

      console.log("WEBSITE SCAN RESPONSE:", websiteData);

      // Stop progress
      clearInterval(timer);
      timer = null;

      setProgress(100);


      // ==============================
      // WEBSITE RISK
      // ==============================

      let critical = 0;
      let high = 0;
      let medium = 0;
      let low = 0;

      const risk = websiteData.risk || "LOW";

      if (risk === "CRITICAL") {
        critical = 1;
      }
      else if (risk === "HIGH") {
        high = 1;
      }
      else if (risk === "MEDIUM") {
        medium = 1;
      }
      else {
        low = 1;
      }


      // ==============================
      // WEBSITE RESULT
      // ==============================

      const websiteResult = {

        securityScore:
          Number(
            websiteData.score ??
            websiteData.securityScore ??
            95
          ),

        critical,

        high,

        medium,

        low,

        totalIssues:
          critical +
          high +
          medium +
          low,

        recommendation:
          websiteData.recommendation ||
          (
            risk === "LOW"
              ? "Website security looks good."
              : "Review the reported security issues."
          ),

        website:
          websiteData.website ||
          websiteUrl.trim(),

        ssl:
          websiteData.ssl || "",

        https:
          websiteData.https || "",

        dns:
          websiteData.dns || "",

        headers:
          websiteData.headers || "",

        risk: risk
      };


      setResult(websiteResult);

    }


    // ==============================
    // APK SCAN
    // ==============================

    else {

      response = await api.post(
        "/apk/scan",
        {
          fileName: apkFile.name,
          projectName: projectName.trim(),
          scanMode: scanMode
        }
      );

      const apkData = response.data || {};

      console.log("APK SCAN RESPONSE:", apkData);

      // Stop progress
      clearInterval(timer);
      timer = null;

      setProgress(100);


      // ==============================
      // APK RISK
      // ==============================

      let critical = 0;
      let high = 0;
      let medium = 0;
      let low = 0;

      const risk = apkData.risk || "LOW";


      if (risk === "CRITICAL") {
        critical = 1;
      }
      else if (risk === "HIGH") {
        high = 1;
      }
      else if (risk === "MEDIUM") {
        medium = 1;
      }
      else {
        low = 1;
      }


      // ==============================
      // APK SECURITY SCORE
      // ==============================

      let securityScore =
        Number(
          apkData.score ??
          apkData.securityScore ??
          95
        );

      if (risk === "CRITICAL") {
        securityScore = 25;
      }
      else if (risk === "HIGH") {
        securityScore = 50;
      }
      else if (risk === "MEDIUM") {
        securityScore = 75;
      }


      // ==============================
      // APK RESULT
      // ==============================

      const apkResult = {

        securityScore,

        critical,

        high,

        medium,

        low,

        totalIssues:
          critical +
          high +
          medium +
          low,

        recommendation:
          apkData.recommendation ||
          (
            risk === "CRITICAL"
              ? "Critical security risk detected. Do not use this APK without further investigation."
              : risk === "HIGH"
                ? "High security risk detected. Review this APK carefully."
                : risk === "MEDIUM"
                  ? "Some security concerns were detected."
                  : "No major security risk detected."
          ),

        packageName:
          apkData.packageName || "",

        certificate:
          apkData.certificate || "",

        permissions:
          apkData.permissions || [],

        malware:
          apkData.malware || "",

        risk: risk
      };


      setResult(apkResult);

    }


    // ==============================
    // SCAN SUCCESS
    // ==============================

    setScanCompleted(true);

    console.log("SCAN COMPLETED SUCCESSFULLY");


    // ==============================
    // LOAD RECENT SCANS
    // ==============================

    try {

      await loadRecentScans();

    }
    catch (historyError) {

      console.error(
        "RECENT SCANS ERROR:",
        historyError
      );

    }

  }
  catch (err) {

    console.error("SCAN ERROR:", err);


    // Stop progress timer if error occurs
    if (timer) {
      clearInterval(timer);
      timer = null;
    }


    // Reset progress
    setProgress(0);


    // ==============================
    // BACKEND ERROR
    // ==============================

    if (err.response) {

      console.error(
        "BACKEND STATUS:",
        err.response.status
      );

      console.error(
        "BACKEND RESPONSE:",
        err.response.data
      );


      const backendMessage =
        err.response.data?.message ||
        err.response.data?.error ||
        (
          typeof err.response.data === "string"
            ? err.response.data
            : null
        );


      setError(
        backendMessage ||
        `Scan failed. Backend returned status ${err.response.status}.`
      );

    }


    // ==============================
    // NETWORK ERROR
    // ==============================

    else if (err.request) {

      console.error(
        "NO RESPONSE FROM BACKEND:",
        err.request
      );

      setError(
        "Cannot connect to backend. Please check the Render backend."
      );

    }


    // ==============================
    // OTHER ERROR
    // ==============================

    else {

      setError(
        err.message ||
        "Scan failed. Please try again."
      );

    }

  }
  finally {

    setLoading(false);

  }
};