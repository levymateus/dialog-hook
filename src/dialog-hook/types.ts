import React from 'react'
import { Observer } from 'src/utils/Observer'

export type Props = { [key: string]: (unknown | null) } | null | undefined

export type Data = { [key: string]:unknown } | null | undefined | string | number

export type UseDialogProps = {
  ok?: Data;
  cancel?: Data;
};

export type UseDialogOptions = {
  /**
   * Close after button click
   */
  close?: boolean;
};

export type Options = UseDialogOptions

/**
 * Confirmation function.
 * @param {*} props - The component props
 */
export type UseDialog = <P = Props>(
  props: P
) => Promise<Data>;

export type EventType = 'click';

export type Handler = (
  event: EventType,
  // eslint-disable-next-line no-undef
  callback: EventListener | EventListenerObject,
  name?: string
) => void;

export type Container = React.MutableRefObject<HTMLElement | null>;

export type HandlerComponentProps = {
  children: React.ReactNode;
  container: Container;
};

export type HandlerRef = {
  ok: Handler;
  cancel: Handler;
}

export type DialogContextProps = {
  show: boolean;
  setShow: (value: boolean) => void;
  setProps: (props: Props) => void;
  alertRef: React.RefObject<HandlerRef>;
  observer: Observer<Data>
};

export type WrapperComponent =
  | React.FC<Props>
  | (<P = Props>(props: P) => React.ReactNode);

export type DialogProviderProps = {
  /**
   * The parent element to render the component.
   */
  parent?: HTMLElement | null;

  /**
   * Render component
   */
  Component: WrapperComponent;

  children?: React.ReactNode | null;
};
