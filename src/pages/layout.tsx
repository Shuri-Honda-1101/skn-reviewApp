import Link from "next/Link";

export default function Layout() {
  return (
    <>
      <h1>skn-review-appへようこそ</h1>
      <h2>
        <div>
          <Link href="/jumps/Login">
            <a>ログイン</a>
          </Link>
        </div>
        <div>
          <Link href="/Signup">
            <a>サインアップ</a>
          </Link>
        </div>
      </h2>
    </>
  );
}
