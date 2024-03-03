import { isArray, isObject, isNil } from 'min-dash';
import { formFieldClasses } from '../Util';
import { Description } from '../Description';
import { Errors } from '../Errors';
import { Label } from '../Label';
import { InputAdorner } from './parts/TemplatedInputAdorner';
import { useFlushDebounce } from '../../hooks/useFlushDebounce';

const type = 'zipcode';

export function Zipcode(props) {
  const {
    disabled,
    errors = [],
    errorMessageId,
    domId,
    onBlur,
    onFocus,
    field,
    readonly,
    value = 'Zip Code'
  } = props;

  const {
    description,
    label,
    appearance = {},
    validate = {}
  } = field;

  const {
    prefixAdorner,
    suffixAdorner
  } = appearance;

  const { required } = validate;

  const [ onInputChange, flushOnChange ] = useFlushDebounce(({ target }) => {
    props.onChange({
      field,
      value: target.value
    });
  });

  const onInputBlur = () => {
    flushOnChange && flushOnChange();
    onBlur && onBlur();
  };

  const onInputFocus = () => {
    onFocus && onFocus();
  };

  return <div class={ formFieldClasses(type, { errors, disabled, readonly }) }>
    <Label
      id={ domId }
      label={ label }
      required={ required } />
    <InputAdorner disabled={ disabled } readonly={ readonly } pre={ prefixAdorner } post={ suffixAdorner }>
      <input
        class="fjs-input"
        disabled={ disabled }
        readOnly={ readonly }
        id={ domId }
        onInput={ onInputChange }
        onBlur={ onInputBlur }
        onFocus={ onInputFocus }
        type="number"
        value={ value }
        aria-describedby={ errorMessageId } />
    </InputAdorner>
    <Description description={ description } />
    <Errors errors={ errors } id={ errorMessageId } />
  </div>;
}

Zipcode.config = {
  type,
  keyed: true,
  label: 'Zip code',
  group: 'address',
  emptyValue: '',
  sanitizeValue: ({ value }) => {
    if (isArray(value) || isObject(value) || isNil(value)) {
      return '';
    }

    return value;
  },
  create: (options = {}) => ({ ...options })
};
