import TodoApp from "./todo/page";
import { NavLink } from "./components/ui/navLink";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <p className="text-blue-300 text-2xl text-center pt-4 ">Hello World!!!</p>
      <p className="text-blue-300 text-2xl text-center pt-4 ">Home Page</p>
      <NavLink href="/todo">Todoページへ</NavLink>

      <TodoApp />
    </div>
  );
}
