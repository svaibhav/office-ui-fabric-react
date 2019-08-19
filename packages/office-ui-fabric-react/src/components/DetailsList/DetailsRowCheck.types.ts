import * as React from 'react';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject, IRenderFunction } from '../../Utilities';

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsRowCheckProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Style override
   */
  styles?: IStyleFunctionOrObject<IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>;

  /**
   * Is the check part of the header in a DetailsList
   */
  isHeader?: boolean;

  /**
   * Whether or not this check is selected
   */
  selected?: boolean;

  /**
   * Deprecated, use `selected` instead.
   * @deprecated Use `selected` instead.
   */
  isSelected?: boolean;

  /**
   * Is any selected - also true for isSelectionModal
   */
  anySelected?: boolean;

  /**
   * Can this checkbox be selectable
   */
  canSelect: boolean;

  /**
   * Is this in compact mode?
   */
  compact?: boolean;

  /**
   * Optional className to attach to the slider root element.
   */
  className?: string;

  /**
   * The classname to be passed down to Check component
   */
  checkClassName?: string;

  /**
   * Whether or not this checkbox is visible
   */
  isVisible?: boolean;

  /**
   * If provided, can be used to render a custom checkbox
   */
  onRenderDetailsCheckbox?: IRenderFunction<IDetailsCheckboxProps>;

  /**
   * Whether to use fast icon and check components. The icons can't be targeted by customization
   * but are still customizable via class names.
   */
  useFastIcons?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export type IDetailsRowCheckStyleProps = Required<Pick<IDetailsRowCheckProps, 'theme'>> &
  Pick<IDetailsRowCheckProps, 'compact' | 'isHeader' | 'selected' | 'anySelected' | 'canSelect' | 'className'> & {
    /** Is checkbox visible */
    isVisible?: boolean;

    /**
     * Controls whether to use the global check host class name (if true) or the calculated one (if false).
     * @deprecated This is a temporary measure in v6 *only* to opt in to fast checkbox styling.
     * This prop does not exist in v7.
     */
    useGlobalCheckHostClass?: boolean;
  };

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsRowCheckStyles {
  root: IStyle;
  check: IStyle;
  isDisabled: IStyle;
}

export interface IDetailsCheckboxProps {
  checked: boolean;
  theme?: ITheme;
}
