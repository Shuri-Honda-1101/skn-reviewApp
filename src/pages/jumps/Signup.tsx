import { useState } from "react";
import { firebase } from "../../../config/firebase";
import { Button } from "antd";

const Signup: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("アカウント作成成功");
      })
      .catch((err) => {
        console.log(err);
        alert("アカウント作成失敗");
      });
  };

  return (
    <>
      <h1>Signupページ</h1>
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
        <button type="submit">アカウント作成</button>
        <Button type="primary">Button</Button>
      </form>
    </>
  );
};

export default Signup;
