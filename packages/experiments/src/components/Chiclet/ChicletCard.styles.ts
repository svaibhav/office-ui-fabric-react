import { normalize } from '../../Styling';
import { IChicletCardStyleProps, IChicletCardStyles } from './ChicletCard.types';

export const getStyles = (props: IChicletCardStyleProps): IChicletCardStyles => {
  const { theme, className } = props;
  const { palette } = theme;

  return {
    root: [
      'ms-ChicletCard',
      theme.fonts.medium,
      normalize,
      {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        backgroundColor: palette.white,
        borderRadius: 2,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        width: 600,
        height: 126,
        userSelect: 'none',
        position: 'relative',
        selectors: {
          ':hover': {
            cursor: 'pointer'
          }
        }
      },
      className
    ],
    preview: [
      'ms-ChicletCard-preview',
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 126,
        width: 198,
        backgroundColor: palette.white
      }
    ],
    info: [
      {
        position: 'relative',
        display: 'block',
        height: '100%',
        overflow: 'hidden',
        wordWrap: 'break-word',
        width: 400
      }
    ],
    title: [
      {
        padding: '9px 26px 5px 11px',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        color: palette.neutralPrimary,
        letterSpacing: 'normal',
        textAlign: 'left',
        height: 37, // Two lines of text, making sure the third line is hidden
        width: 363,
        lineHeight: '1.25',
        overflow: 'hidden',
        wordWrap: 'break-word'
      }
    ],
    description: [
      {
        padding: '0px 16px 17px 11px',
        fontSize: 12,
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: '1.33',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#797671', // @todo: get theme from designers
        width: 248,
        height: 16,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    ]
  };
};
