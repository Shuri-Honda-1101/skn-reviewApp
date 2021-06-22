import { useState } from "react";
import { firebase } from "../../../config/firebase";

const Login: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("ログイン成功");
      })
      .catch((err) => {
        console.log(err);
        alert("ログイン失敗");
      });
  };

  return (
    <>
      <h1>Loginページ</h1>
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
        <button type="submit">ログイン</button>
      </form>
    </>
  );
};

export default Login;
