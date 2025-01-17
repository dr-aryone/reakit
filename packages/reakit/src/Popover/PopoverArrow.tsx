import * as React from "react";
import { createComponent } from "reakit-system/createComponent";
import { createHook } from "reakit-system/createHook";
import { mergeRefs } from "reakit-utils/mergeRefs";
import { BoxOptions, BoxHTMLProps, useBox } from "../Box/Box";
import { usePopoverState, PopoverStateReturn } from "./PopoverState";

export type PopoverArrowOptions = BoxOptions &
  Pick<
    Partial<PopoverStateReturn>,
    "unstable_arrowRef" | "unstable_arrowStyles"
  > &
  Pick<PopoverStateReturn, "placement">;

export type PopoverArrowHTMLProps = BoxHTMLProps;

export type PopoverArrowProps = PopoverArrowOptions & PopoverArrowHTMLProps;

export const usePopoverArrow = createHook<
  PopoverArrowOptions,
  PopoverArrowHTMLProps
>({
  name: "PopoverArrow",
  compose: useBox,
  useState: usePopoverState,

  useProps(options, { ref: htmlRef, style: htmlStyle, ...htmlProps }) {
    const [placement] = options.placement.split("-");
    const transformMap = {
      top: "rotateZ(180deg)",
      right: "rotateZ(-90deg)",
      bottom: "rotateZ(360deg)",
      left: "rotateZ(90deg)"
    };
    const { unstable_arrowStyles: arrowStyles } = options;
    return {
      ref: mergeRefs(options.unstable_arrowRef, htmlRef),
      style: {
        ...arrowStyles,
        top: arrowStyles ? arrowStyles.top || undefined : undefined,
        position: "absolute",
        fontSize: "30px",
        width: "1em",
        height: "1em",
        pointerEvents: "none",
        transform: transformMap[placement as keyof typeof transformMap],
        [placement]: "100%",
        ...htmlStyle
      },
      children: (
        <svg viewBox="0 0 30 30">
          <path
            className="stroke"
            d="M23.7,27.1L17,19.9C16.5,19.3,15.8,19,15,19s-1.6,0.3-2.1,0.9l-6.6,7.2C5.3,28.1,3.4,29,2,29h26
        C26.7,29,24.6,28.1,23.7,27.1z"
          />
          <path
            className="fill"
            d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"
          />
        </svg>
      ),
      ...htmlProps
    };
  }
});

export const PopoverArrow = createComponent({
  as: "div",
  useHook: usePopoverArrow
});
