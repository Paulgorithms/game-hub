import {
  Avatar as ChakraAvatar,
  AvatarGroup as ChakraAvatarGroup,
  AvatarProps as ChakraAvatarProps,
} from "@chakra-ui/react";
import * as React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export interface AvatarProps extends ChakraAvatarProps {
  name?: string;
  src?: string;
  srcSet?: string;
  loading?: ImageProps["loading"];
  icon?: React.ReactElement;
  fallback?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(props, ref) {
    const { name, src, srcSet, loading, icon, fallback, children, ...rest } =
      props;

    return (
      <ChakraAvatar
        ref={ref}
        src={src}
        srcSet={srcSet}
        loading={loading}
        {...rest}
      >
        {fallback ?? children ?? icon}
      </ChakraAvatar>
    );
  }
);

export const AvatarGroup = ChakraAvatarGroup;
