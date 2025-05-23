import useStore from "../../store/zustand/store"

export const useIsToggled = () => useStore((state:any) => state.isToggled);
export const useToggle = () => useStore((state:any) => state.toggle);
