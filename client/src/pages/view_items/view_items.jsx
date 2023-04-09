import { Items } from "../../components/items/items";
import { SubNav } from "../../components/subNav/subNav";
import "./view_items.scss";

export const ViewItems = () => {
  return (
    <div className="viewMain">
      <SubNav />
      <Items />
    </div>
  );
};
