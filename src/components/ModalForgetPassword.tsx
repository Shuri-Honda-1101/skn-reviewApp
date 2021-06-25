interface AppProps {
  setOpenModalForgetPassword: (x: boolean) => void;
  resetPasswordEmail: string;
  setResetPasswordEmail: (x: string) => void;
  onClickResetPasswordSubmit: (
    e: React.FormEvent<HTMLButtonElement>
  ) => Promise<void>;
}

const ModalForgetPassword: React.FC<AppProps> = ({
  setOpenModalForgetPassword,
  resetPasswordEmail,
  setResetPasswordEmail,
  onClickResetPasswordSubmit,
}) => {
  return (
    <>
      <div className="modal">
        <div className="inner">
          <h1>パスワードの再設定</h1>
          <form>
            <input
              type="email"
              id="email"
              name="email"
              value={resetPasswordEmail}
              placeholder="メールアドレス"
              onChange={(e) => setResetPasswordEmail(e.target.value)}
            />
            <button type="submit" onClick={onClickResetPasswordSubmit}>
              OK
            </button>
          </form>
          <button
            onClick={() => {
              setOpenModalForgetPassword(false);
              setResetPasswordEmail("");
            }}
          >
            閉じる
          </button>
        </div>
      </div>
      <style jsx>{`
        .modal {
          z-index: 4;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .inner {
          background-color: #fffffe;
          width: calc(772 / 1920 * 100vw);
          height: calc(580 / 1920 * 100vw);
          border-radius: calc(65 / 1920 * 100vw);
          display: flex;
          flex-direction: column;
          padding: calc(57.5 / 1920 * 100vw) calc(70.5 / 1920 * 100vw);
        }
      `}</style>
    </>
  );
};

export default ModalForgetPassword;
