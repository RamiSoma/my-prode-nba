import MenuOption from "@/components/MenuOption";

export default function Menu() {
  return (
    <div className="absolute flex flex-column lg:flex-row  w-full h-screen top-[0px]">
      <MenuOption
        className={"h-1/3 w-full lg:right-0 lg:w-1/2 lg:h-screen"}
        wallpaper={"shaidraw"}
        route={"playoff"}
        text={"Predicts"}
      />

      <MenuOption
        className={"top-1/3 h-1/3 w-full lg:top-0 lg:w-1/2 lg:h-1/2"}
        wallpaper={"luka"}
        route={"specialPredicts"}
        text={"Special Predicts"}
      />
      <MenuOption
        className={"top-2/3 h-1/3 w-full lg:top-1/2 lg:w-1/2 lg:h-1/2"}
        wallpaper={"edwards"}
        route={"posiciones"}
        text={"Tables"}
      />
    </div>
  );
}
