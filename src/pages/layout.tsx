import Link from "next/Link";

export default function Layout() {
  return (
    <>
      <h1>skn-review-appへようこそ</h1>
      <h2>
        <Link href="/jumps/Login">
          <a>ログイン</a>
        </Link>
        <Link href="/Signup">
          <a>サインアップ</a>
        </Link>
      </h2>
    </>
  );
}
