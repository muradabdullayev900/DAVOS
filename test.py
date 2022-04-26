import requests

urls = [
    'http://localhost:8000/login',
    'http://localhost:8000/signup',
    'http://localhost:8000/password/reset',
    'http://localhost:8000/password/reset/confirm'
]

if __name__ == '__main__':
    print("Testing health endpoints...")
    passed = 0
    failed = 0

    for num, url in enumerate(urls, start=1):
        r = requests.get(url)
        if str(r.status_code).startswith("2"):
            print(f" * Test no {num} passed succcessfully\t\ton {url}")
            passed += 1
        elif str(r.status_code).startswith("5"):
            print(f" * Test no {num} failed\t\t\t\ton {url}")
            failed += 1
    print(f"\n\nTotal passed: {passed}\nTotal failed: {failed}")