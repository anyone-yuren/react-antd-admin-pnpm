export { default as GDialog } from './mw-dialog';

import { GDialogProps } from './mw-dialog';

declare const GDialog: React.ForwardRefExoticComponent<
  GDialogProps & React.RefAttributes<HTMLDivElement>
>;

export default GDialog;
