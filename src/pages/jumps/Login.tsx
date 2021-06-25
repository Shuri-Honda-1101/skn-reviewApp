import { useState } from "react";
import { firebase } from "../../../config/firebase";
import { Button } from "antd";
import Link from "next/Link";
import ModalForgetPassword from "../../components/ModalForgetPassword";

const Login: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openModalForgetPassword, setOpenModalForgetPassword] =
    useState<boolean>(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  //パスワード再設定
  const onClickResetPasswordSubmit = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const result = await firebase
      .auth()
      .sendPasswordResetEmail(resetPasswordEmail)
      .then(() => {
        setResetPasswordEmail("");
        setOpenModalForgetPassword(false);
        return "入力されたメールアドレスにパスワード再設定のご案内をお送りしました";
      })
      .catch(() => {
        setResetPasswordEmail("");
        return "存在しないメールアドレスです";
      });
    alert(result);
  };

  //メールアドレスでログイン
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
  const onClickGoogle = async (): Promise<void> => {
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
  const onClickTwitter = async (): Promise<void> => {
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
      {openModalForgetPassword && (
        <ModalForgetPassword
          setOpenModalForgetPassword={setOpenModalForgetPassword}
          resetPasswordEmail={resetPasswordEmail}
          setResetPasswordEmail={setResetPasswordEmail}
          onClickResetPasswordSubmit={onClickResetPasswordSubmit}
        />
      )}
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
        <button
          onClick={(): void => {
            setOpenModalForgetPassword(true);
          }}
        >
          パスワードを忘れましたか？
        </button>
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
