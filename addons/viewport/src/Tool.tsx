/* eslint-disable no-fallthrough */
import React, { Fragment, ReactNode, useEffect, useRef, FunctionComponent } from 'react';
import memoize from 'memoizerific';

import { styled, Global, Theme, withTheme } from '@storybook/theming';

import { Icons, IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';

import { useParameter, useAddonState } from '@storybook/api';
import { PARAM_KEY, ADDON_ID } from './constants';
import { ViewportAddonParameter, ViewportMap, ViewportStyles, Styles } from './models';

interface ViewportItem {
  id: string;
  title: string;
  styles: Styles;
  type: 'desktop' | 'mobile' | 'tablet' | 'other';
  default?: boolean;
}

const toList = memoize(50)((items: ViewportMap): ViewportItem[] => [
  ...baseViewports,
  ...Object.entries(items).map(([id, { name, ...rest }]) => ({ ...rest, id, title: name })),
]);

const responsiveViewport: ViewportItem = {
  id: 'reset',
  title: 'Reset viewport',
  styles: null,
  type: 'other',
};

const baseViewports: ViewportItem[] = [responsiveViewport];

const toLinks = memoize(50)((list: ViewportItem[], active: LinkBase, set, state, close): Link[] => {
  return list
    .map(i => {
      switch (i.id) {
        case responsiveViewport.id: {
          if (active.id === i.id) {
            return null;
          }
        }
        default: {
          return {
            ...i,
            onClick: () => {
              set({ ...state, selected: i.id });
              close();
            },
          };
        }
      }
    })
    .filter(Boolean);
});

const iframeId = 'storybook-preview-iframe';
const wrapperId = 'storybook-preview-wrapper';

interface LinkBase {
  id: string;
  title: string;
  right?: ReactNode;
  type: 'desktop' | 'mobile' | 'tablet' | 'other';
  styles: ViewportStyles | ((s: ViewportStyles) => ViewportStyles) | null;
}

interface Link extends LinkBase {
  onClick: () => void;
}

const flip = ({ width, height }: ViewportStyles) => ({ height: width, width: height });

const ActiveViewportSize = styled.div(() => ({
  display: 'inline-flex',
}));

const ActiveViewportLabel = styled.div<{}>(({ theme }) => ({
  display: 'inline-block',
  textDecoration: 'none',
  padding: '10px',
  fontWeight: theme.typography.weight.bold,
  fontSize: theme.typography.size.s2 - 1,
  lineHeight: 1,
  height: 40,
  border: 'none',
  borderTop: '3px solid transparent',
  borderBottom: '3px solid transparent',
  background: 'transparent',
}));

const IconButtonWithLabel = styled(IconButton)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
}));

const IconButtonLabel = styled.div<{}>(({ theme }) => ({
  fontSize: theme.typography.size.s2 - 1,
  marginLeft: '10px',
}));

interface ViewportToolState {
  isRotated: boolean;
  selected: string | null;
}

const getStyles = (
  prevStyles: ViewportStyles,
  styles: Styles,
  isRotated: boolean
): ViewportStyles => {
  if (styles === null) {
    return null;
  }
  const result = typeof styles === 'function' ? styles(prevStyles) : styles;
  return isRotated ? flip(result) : result;
};

export const ViewportTool: FunctionComponent<{}> = React.memo(
  withTheme(({ theme }: { theme: Theme }) => {
    const { viewports, defaultViewport, disable } = useParameter<ViewportAddonParameter>(
      PARAM_KEY,
      {
        viewports: {},
        defaultViewport: responsiveViewport.id,
      }
    );
    const [state, setState] = useAddonState<ViewportToolState>(ADDON_ID, {
      selected: defaultViewport || responsiveViewport.id,
      isRotated: false,
    });
    const list = toList(viewports);

    const { selected, isRotated } = state;
    const item =
      list.find(i => i.id === selected) ||
      list.find(i => i.id === defaultViewport) ||
      list.find(i => i.default) ||
      responsiveViewport;

    const ref = useRef<ViewportStyles>();

    const styles = getStyles(ref.current, item.styles, isRotated);

    useEffect(() => {
      ref.current = styles;
    }, [item]);

    if (disable || Object.entries(viewports).length === 0) {
      return null;
    }

    return (
      <Fragment>
        <WithTooltip
          placement="top"
          trigger="click"
          tooltip={({ onHide }) => (
            <TooltipLinkList links={toLinks(list, item, setState, state, onHide)} />
          )}
          closeOnClick
        >
          <IconButtonWithLabel
            key="viewport"
            title="Change the size of the preview"
            active={!!styles}
            onDoubleClick={() => {
              setState({ ...state, selected: responsiveViewport.id });
            }}
          >
            <Icons icon="grow" />
            {styles ? (
              <IconButtonLabel>
                {isRotated ? `${item.title} (L)` : `${item.title} (P)`}
              </IconButtonLabel>
            ) : null}
          </IconButtonWithLabel>
        </WithTooltip>

        {styles ? (
          <ActiveViewportSize>
            <Global
              styles={{
                [`#${iframeId}`]: {
                  margin: `auto`,
                  transition: 'width .3s, height .3s',
                  position: 'relative',
                  border: `${theme.layoutMargin}px solid black`,
                  borderRadius: theme.appBorderRadius,
                  boxShadow:
                    '0 0 100px 1000px rgba(0,0,0,0.5), 0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',

                  ...styles,
                },
                [`#${wrapperId}`]: {
                  padding: theme.layoutMargin,
                  display: 'flex',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  justifyItems: 'center',
                  overflow: 'auto',
                },
              }}
            />
            <ActiveViewportLabel title="Viewport width">
              {styles.width.replace('px', '')}
            </ActiveViewportLabel>
            <IconButton
              key="viewport-rotate"
              title="Rotate viewport"
              onClick={() => {
                setState({ ...state, isRotated: !isRotated });
              }}
            >
              <Icons icon="transfer" />
            </IconButton>
            <ActiveViewportLabel title="Viewport height">
              {styles.height.replace('px', '')}
            </ActiveViewportLabel>
          </ActiveViewportSize>
        ) : null}
      </Fragment>
    );
  })
);
