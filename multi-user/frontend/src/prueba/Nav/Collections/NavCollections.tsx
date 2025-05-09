import { NavBarItem, Header } from "../Nav";
import { FaFolder } from "react-icons/fa";
import { PlatformIcon } from "./PlatformIcon";
import { HeaderButton } from "./HeaderButton";
import { RightIcons } from "./RightIcons";
import { Collection } from "../../../models/Collection";
import { IconType } from "react-icons";
import { Dispatch, SetStateAction } from "react";

const NavCollectionsData: {
  headerTitle: string;
  Icon: IconType;
  loading: boolean;
  error: boolean;
  navlinkKeyField: keyof Collection;
  navlinkValueField: keyof Collection;
  activeColorNavlink: boolean;
  autocomplete: boolean;
  autocompletePlaceholder: string;
} = {
  headerTitle: "Collections",
  Icon: FaFolder,
  loading: false,
  error: false,
  navlinkKeyField: "url",
  navlinkValueField: "name",
  activeColorNavlink: true,
  autocomplete: true,
  autocompletePlaceholder: "Search Collection",
};

type NavCollectionsProps = {
  collections: Collection[];
  setActive: Dispatch<SetStateAction<Collection | undefined>>;
  active: Collection | undefined;
  addModalOpened: boolean;
  setAddModalOpened: (opened: boolean) => void;
  setDeleteModalOpened: (opened: boolean) => void;
  setShareModalOpened: (opened: boolean) => void;
};

export function NavCollections({
  collections,
  setActive,
  active,
  addModalOpened,
  setAddModalOpened,
  setDeleteModalOpened,
  setShareModalOpened,
}: NavCollectionsProps) {
  const loadingIcons = collections.map((collection) => {
    return collection.status === "loading" ? true : false;
  });

  const PlatformIcons = collections.map((collection) => {
    return <PlatformIcon key={collection.url} platform={collection.platform} />;
  });

  const RightIconsComponent = collections.map((collection) => {
    return (
      <RightIcons
        key={collection.url}
        collection={collection}
        setDeleteModalOpened={setDeleteModalOpened}
        setShareModalOpened={setShareModalOpened}
      />
    );
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Header
        title={NavCollectionsData.headerTitle}
        Icon={NavCollectionsData.Icon}
        rightElement={
          <HeaderButton
            loading={addModalOpened}
            setLoading={setAddModalOpened}
          />
        }
      />
      <NavBarItem
        data={collections}
        loading={NavCollectionsData.loading}
        error={NavCollectionsData.error}
        leftElement={PlatformIcons}
        rightElement={RightIconsComponent}
        loadingIcon={loadingIcons}
        navlinkKeyField={NavCollectionsData.navlinkKeyField}
        navlinkValueField={NavCollectionsData.navlinkValueField}
        activeColorNavlink={NavCollectionsData.activeColorNavlink}
        autocomplete={NavCollectionsData.autocomplete}
        autocompletePlaceholder={NavCollectionsData.autocompletePlaceholder}
        setActive={setActive}
        active={active}
      />
    </div>
  );
}
