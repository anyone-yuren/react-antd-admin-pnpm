export { default as MwDialog } from './mw-dialog';

import { GDialogProps } from './mw-dialog';

declare const MwDialog: React.ForwardRefExoticComponent<
  GDialogProps & React.RefAttributes<HTMLDivElement>
>;

export default MwDialog;
