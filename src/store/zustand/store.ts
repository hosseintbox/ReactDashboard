import { create } from "zustand";

interface StoreState {
  refetch: (() => void) | null;
  setRefetch: (refetch: () => void) => void;
  isToggled: boolean;
  toggle: () => void;
  setToggledFalse: () => void;
  SelectedItem: any;
  setSelectedItem: (newData: any) => void;
  clearSelectedItem: () => void;
  ButtonValue: any;
  setButtonValue: (buttonValue: any) => void;
  dataList: any[];
  setDataList: (newData: any[]) => void;
  hubList: any[];
  setHubList: (newData: any[]) => void;
  fleetList: any[];
  setFleetList: (newData: any[]) => void;
  zoneList: any[];
  setZoneList: (newData: any[]) => void;
  location: any;
  setLocation: (newData: any) => void;
  userList: any[];
  setUserList: (newData: any[]) => void;
  currentLocation: any;
  setCurrentLocation: (newData: any) => void;
  Token: string | null;
  setToken: (newData: any | null) => void;
  userData: any;
  setUserData: (newData: any) => void;
  logout: () => void;
  selectedRowData: any[];
  setSelectedRowData: (newData: any) => void;
}

const useStore = create<StoreState>((set) => ({
  selectedRowData: [],
  setSelectedRowData: (newData) => set({ selectedRowData: newData }),

  refetch: null,
  setRefetch: (refetch) => set({ refetch }),

  isToggled: false,
  toggle: () => set((state) => ({ isToggled: true })), // سوییچ بین true و false
  setToggledFalse: () => set({ isToggled: false }),

  SelectedItem: null,
  setSelectedItem: (newData) => set({ SelectedItem: newData }),
  clearSelectedItem: () => set({ SelectedItem: null }),

  ButtonValue: null,
  setButtonValue: (newValue) => set({ ButtonValue: newValue }),

  dataList: [],
  setDataList: (newData) => set({ dataList: newData }),

  hubList: [],
  setHubList: (newData) => set({ hubList: newData }),

  fleetList: [],
  setFleetList: (newData) => set({ fleetList: newData }),

  zoneList: [],
  setZoneList: (newData) => set({ zoneList: newData }),

  location: null,
  setLocation: (newData) => set({ location: newData }),

  userList: [],
  setUserList: (newData) => set({ userList: newData }),

  currentLocation: null,
  setCurrentLocation: (newData) => set({ currentLocation: newData }),

  Token: null,
  setToken: (newData) => set({ Token: newData }),
  userData: null,
  setUserData: (newData) => set({ userData: newData }),
  logout: () => set({ userData: null }),
}));

export default useStore;
