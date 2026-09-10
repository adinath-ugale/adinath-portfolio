"""
Convenient local server runner for Adinath Ugale's Portfolio.
Run: python serve.py
Automatically opens the portfolio in your default browser.
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"==================================================")
        print(f"  ADINATH UGALE - AI & DATA SCIENCE PORTFOLIO")
        print(f"  Server running at: {url}")
        print(f"  Press Ctrl+C to stop the server")
        print(f"==================================================")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
