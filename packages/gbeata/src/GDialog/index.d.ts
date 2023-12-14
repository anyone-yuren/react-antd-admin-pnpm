export { default as GDialog } from './g-dialog';

import { GDialogProps } from './g-dialog';

declare const GDialog: React.ForwardRefExoticComponent<
  GDialogProps & React.RefAttributes<HTMLDivElement>
>;

export default GDialog;
