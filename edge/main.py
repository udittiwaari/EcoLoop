"""Minimal edge-compatible health endpoint for EcoLoop."""

import json


def app(environ, start_response):
    if environ.get("PATH_INFO") == "/health":
        body = json.dumps({"ok": True, "service": "ecoloop-edge"}).encode("utf-8")
        start_response("200 OK", [("Content-Type", "application/json"), ("Content-Length", str(len(body)))])
        return [body]

    body = b"EcoLoop edge endpoint"
    start_response("200 OK", [("Content-Type", "text/plain; charset=utf-8"), ("Content-Length", str(len(body)))])
    return [body]
