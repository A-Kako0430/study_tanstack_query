import LoginForm from "@/components/chat/loginForm/LoginForm";
import classes from "./Chat.module.scss";
import ChatPanel from "@/components/chat/chatPanel/ChatPanel";
import Header from "@/components/chat/header/Header";
import { CssBaseline } from "@mui/material";

export default function Chat() {
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Header />
      <ChatPanel />
      <LoginForm />
    </main>
  )
}
