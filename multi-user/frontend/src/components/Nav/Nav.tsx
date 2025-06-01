import {
  Skeleton,
  Box,
  Autocomplete,
  Alert,
  NavLink,
  Text,
  Loader,
} from "@mantine/core";
import { MdErrorOutline } from "react-icons/md";
import React from "react";
import { IconType } from "react-icons";
import { useColors } from "../../theme/theme.context";

type HeaderProps = {
  title: string;
  Icon: IconType;
  rightElement?: React.ReactNode;
};

export function Header({ title, Icon, rightElement }: HeaderProps) {
  const { colors } = useColors();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderBottom: "1px solid " + colors.separator,
        backgroundColor: colors.backgroundPrimary,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Icon size="22px" color={colors.secondaryText} />
        <Text
          fw={600}
          size="lg"
          style={{ marginTop: "2px", color: colors.modalTitle }}
        >
          {title}
        </Text>
      </div>
      {rightElement}
    </div>
  );
}

type NavBarItemProps<T> = {
  data: T[];
  loading: boolean;
  error: boolean;
  leftElement: React.ReactNode[];
  rightElement: React.ReactNode[] | undefined;
  navlinkKeyField: keyof T;
  navlinkValueField: keyof T;
  loadingIcon: boolean[];
  activeColorNavlink: boolean;
  autocomplete: boolean;
  autocompletePlaceholder: string;
  active: T | undefined;
  setActive: React.Dispatch<React.SetStateAction<T | undefined>>;
};

export function NavBarItem<T>({
  data,
  loading,
  error,
  leftElement,
  rightElement,
  navlinkKeyField,
  navlinkValueField,
  loadingIcon,
  activeColorNavlink,
  autocomplete,
  autocompletePlaceholder,
  setActive,
  active,
}: NavBarItemProps<T>) {
  const { colors } = useColors();
  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Alert
          title="Error"
          icon={<MdErrorOutline size={"xl"} />}
          color={colors.alertError}
        >
          Failed to load data, please try again later.
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Box>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </Box>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {autocomplete && (
        <Autocomplete
          data={data.map((item) => String(item[navlinkValueField]))}
          placeholder={autocompletePlaceholder}
          style={{ width: "100%" }}
          onOptionSubmit={(value) => {
            const selectedItem = data.find(
              (item) => String(item[navlinkValueField]) === value
            );
            setActive(selectedItem);
          }}
        />
      )}
      <Box>
        {data.map((item, index) =>
          loadingIcon[index] ? (
            <NavLink
              key={String(item[navlinkKeyField])}
              disabled
              label={String(item[navlinkValueField])}
              active={false}
              leftSection={leftElement[index]}
              rightSection={<Loader color={colors.loader} size="sm" />}
            />
          ) : (
            <NavLink
              key={String(item[navlinkKeyField])}
              label={String(item[navlinkValueField])}
              leftSection={leftElement[index]}
              rightSection={rightElement ? rightElement[index] : undefined}
              onClick={() => {
                setActive(item);
              }}
              active={activeColorNavlink && active === item}
            />
          )
        )}
        <hr
          style={{ border: "none", borderTop: "1px solid " + colors.separator }}
        />
      </Box>
    </div>
  );
}
