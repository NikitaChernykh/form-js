import { formFieldClasses } from '../Util';
import { Label } from '../Label';
import classNames from 'classnames';
import { FormField } from '../FormField';

export function Address(props) {
  const {
    field,
    domId,
  } = props;
  const { label, type, showOutline, verticalAlignment = 'start' } = field;

  const zipcode = {
    key: 'zipcode',
    type: 'zipcode',
    label: 'Zip code',
    _parent: field.id
  };

  const phone = {
    key: 'phone',
    type: 'phone',
    label: 'Phone',
    _parent: field.id
  };

  return (
    <div className={ classNames(formFieldClasses(type), 'fjs-form-field-grouplike' , { 'fjs-outlined' : showOutline }) } role="group" aria-labelledby={ domId }>
      <Label id={ domId } label={ label } />
      <div class="fjs-layout-row cds--row" style={ { alignItems: verticalAlignment } }>
        <FormField
          field={ zipcode }
        />
        <FormField
          field={ phone }
        />
      </div>
    </div>
  );
}

Address.config = {
  type: 'address',
  pathed: true,
  label: 'Address',
  group: 'address',
  create: (options = {}) => ({
    components: [],
    showOutline: true,
    ...options
  })
};

