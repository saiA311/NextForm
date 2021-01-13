import { useRouter } from "next/router";
import Link from "next/link";
import { useStateValue } from "./StateProvider";

const Header = ({ path, direction, style }) => {
  const [{ jwts, username }, dispatch] = useStateValue();
  const router = useRouter();
  const ClickHandler = () => {
    dispatch({
      type: "DELETE_TOKEN",
    });
    router.replace("/");
  };
  if (jwts === "" && username === "") {
    return (
      <div>
        <header className={style}>
          <Link href={path}>
            <a>
              <h2>{direction}</h2>
            </a>
          </Link>
        </header>
      </div>
    );
  } else {
    return (
      <div>
        <header className={style}>
          <button onClick={ClickHandler}>
            <h2>{direction}</h2>
          </button>
        </header>
      </div>
    );
  }
};

export default Header;
