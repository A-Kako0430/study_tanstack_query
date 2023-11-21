import LoginForm from "@/components/chat/loginForm/LoginForm";
import classes from "./Chat.module.scss";
import ChatPanel from "@/components/chat/chatPanel/ChatPanel";

export default function Chat() {
  return (
    <main className={classes.main}>
      <ChatPanel />
      <LoginForm />
    </main>
  )
}
