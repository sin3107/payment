export default function expressCallback(controller) {
    return async (req, res) => {
      try {
        const httpRequest = {
          body: req.body,
          query: req.query,
          params: req.params,
          ip: req.ip,
          method: req.method,
          path: req.originalUrl,
          files: req.files,
          headers: {
            "Content-Type": req.get("Content-Type"),
            Referer: req.get("referer"),
            "User-Agent": req.get("User-Agent"),
          },
        };
        const httpResponse = await controller(httpRequest);
        if (httpResponse.headers) res.httpRequest(httpResponse.headers);
        res.type("json");
        res.status(parseInt(httpResponse.statusCode)).send(httpResponse.body);
      } catch (err) {
        console.log("path: ", req.originalUrl);
        console.log("call back error: ", err);
        res.status(500).send({ error: "An unknown error occured." });
      }
    };
  }