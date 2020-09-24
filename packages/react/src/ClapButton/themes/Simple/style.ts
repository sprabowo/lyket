import { SxStyleProp } from 'theme-ui';

export const style: Record<string, SxStyleProp> = {
  root: {
    color: 'inherit',
    fontFamily: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
  },
  counter: {
    ml: '.5em',
    color: 'text',
    fontWeight: 'body',
    fontFamily: 'body',
  },
  icon: {
    height: '2em',
    transition: 'all 0.2s cubic-bezier(0.280, 0.840, 0.420, 1)',
    display: 'block',
    margin: '0 auto',
    fill: 'text',
  },
  ring: {
    opacity: '0',
    width: `90%`,
    height: `90%`,
    borderRadius: `3em`,
    border: `1px solid`,
    borderColor: 'highlight',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  button: {
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    background: 'transparent',
    appearance: 'none',
    position: 'relative',
    fontSize: 'inherit',
    borderRadius: '100%',
    transition: 'all 0.2s cubic-bezier(0.280, 0.840, 0.420, 1)',
    width: '3em',
    height: '3em',
    padding: '0',
    lineHeight: '1em',
  },
  baloon: {
    opacity: '0',
    position: 'absolute',
    transition: 'all 0.2s cubic-bezier(0.280, 0.840, 0.420, 1)',
    fontSize: '.8em',
    height: '3.4em',
    width: '3.4em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'text',
    borderRadius: '100%',
    top: '-3em',
    left: '-1.7em',
  },
  centeredContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};
