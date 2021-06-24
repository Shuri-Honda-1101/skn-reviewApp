import { useState } from "react";
import { firebase } from "../../../config/firebase";
import { Button } from "antd";
import Link from "next/Link";

const Login: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //メールアドレスでログイン
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return "成功";
      })
      .catch((err) => {
        console.log(err);
        return "失敗";
      });
    alert(`ログイン処理が${result}しました`);
  };

  //Googleログイン
  const onClickGoogle = async (): void => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        return "成功";
      })
      .catch((error) => {
        console.log(error);
        return "失敗";
      });
    alert(`googleログインが${result}しました`);
  };

  //Twitterログイン
  const onClickTwitter = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    const result = await firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        return "成功";
      })
      .catch((error) => {
        console.log(error);
        return "失敗";
      });
    alert(`Twitterログインに${result}しました`);
  };

  return (
    <>
      <h1>Loginページ</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">メールアドレス: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="メールアドレス"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">パスワード: </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="パスワード"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">メールアドレスでログイン</button>
        </form>
      </div>
      <div>
        <Button type="primary" onClick={onClickGoogle}>
          Googleで新規登録/ログイン
        </Button>
      </div>
      <div>
        <Button type="primary" onClick={onClickTwitter}>
          Twitterで新規登録/ログイン
        </Button>
      </div>
      <div>
        <Link href="/jumps/Signup">
          <a>新規登録はこちらから</a>
        </Link>
      </div>
    </>
  );
};

export default Login;
