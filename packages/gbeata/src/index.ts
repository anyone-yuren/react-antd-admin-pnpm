import GAction, { registerAction } from './GAction';
import GButton, { setPermissionList } from './GButton';
import GCard from './GCard';
import GCardGroup from './GCardGroup';
import GCtrl from './GCtrl';
import GDialog, { setGlobalDialogField } from './GDialog';
import GDialogForm from './GDialogForm';
import GField from './GField';
import GFields from './GFields';
import GForm, { registerField } from './GForm';
import { error, info, success, warning } from './GMessage';
import GSearch, { setSearchDefaultVisibleRow } from './GSearch';
import GSearchList, { Selection, SelectionAll } from './GSearchList';
import GSearchTable, { setSearchTableDefaultValue } from './GSearchTable';
import GSelect from './GSelect';
import GTable, {
  registerTableRender,
  setDefaultDataFilter,
  setDefaultSearchFilter,
  setTableDefaultProps,
} from './GTable';

import { default as GTagGroup } from './GTagGroup';
export {
  GAction,
  GButton,
  GCard,
  GCardGroup,
  GCtrl,
  GDialog,
  GDialogForm,
  GField,
  GFields,
  GForm,
  GSearch,
  GSearchList,
  GSearchTable,
  GSelect,
  GTable,
  GTagGroup,
  Selection,
  SelectionAll,
  error,
  info,
  registerAction,
  registerField,
  registerTableRender,
  setDefaultDataFilter,
  setDefaultSearchFilter,
  setGlobalDialogField,
  setPermissionList,
  setSearchDefaultVisibleRow,
  setSearchTableDefaultValue,
  setTableDefaultProps,
  success,
  warning,
};

const init = {
  success,
  info,
  GCard,
  GCtrl,
  error,
  warning,
  GTagGroup,
  GButton,
  setPermissionList,
  GForm,
  registerField,
  GFields,
  GField,
  GDialog,
  setGlobalDialogField,
  GDialogForm,
  GSearch,
  setSearchDefaultVisibleRow,
  GCardGroup,
  GSearchTable,
  Selection,
  SelectionAll,
  setSearchTableDefaultValue,
  GSelect,
  GTable,
  setDefaultDataFilter,
  setDefaultSearchFilter,
  registerTableRender,
  setTableDefaultProps,
  GAction,
  registerAction,
  GSearchList,
};

export default init;
export * from './index.d';
