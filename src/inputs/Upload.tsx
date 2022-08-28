/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable prefer-template */
import { Upload as AntDUpload } from 'antd'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Upload as KitUpload, palette, Modal, Button, Icon } from '@my/ui-kit'
import { useField, shouldDisplayFieldError, fieldSubscription, FieldValidator, useForm } from 'form'
import { closeDialog, openDialog, useDialog } from 'utils'
import { Link } from 'ui'
import { useDerivedFieldProps } from './useDerivedFieldProps'

type KitUploadProps = Parameters<typeof KitUpload>[0]
type UploadFileList = NonNullable<KitUploadProps['fileList']>

declare global {
  type UploadFile = UploadFileList[number]
}

type ChangeHandler = NonNullable<KitUploadProps['setFileList']>

type ConfirmClear = {
  file: string
  newValue: UploadFile[] | []
  change: (value: UploadFile[] | []) => void
}

const UploadWrapper = styled.div<{ disableUpload: boolean }>`
  > div:nth-child(1) {
    > span {
      display: ${props => props.disableUpload ? 'none' : undefined};
      > div > span > div {
        > div{
          padding-top: 0px;
          display: inline-flex;
        }
        > p {
          padding: 0px;
        }
      }
    }
  }
  margin-bottom: 16px;
`

type BeforeUploadHandler = NonNullable<KitUploadProps['beforeUpload']>

const FileName = styled.span<{ bordered?: boolean }>`
  word-break: break-all;
  color: ${palette.BLUE};
  margin-left: 12px;
`
const FileItem = styled.div<{ bordered: boolean, error: boolean }>`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  ${({ bordered, error }) => bordered && `
    border: 1px solid ${error ? palette.RED : palette.LIGHT_BLUE_2};
    border-radius: 7px;
    padding: 10px 24px;
  `}
  .anticon {
    margin-left: 4px;
    font-size: 18px;
  }
  .anticon-check-circle {
    color: ${palette.GREEN};
  }
  .anticon-close-circle {
    cursor: pointer;
    color: ${palette.GRAY_2};
    & :hover {
      color: ${palette.RED};
    }
  }
`
const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 40px 88px;
  }
`
const FileWrapper = styled.div`
`
const File = styled.div`
  border: 1px solid ${palette.LIGHT_BLUE_2}; 
  border-radius: 7px; 
  display: inline-flex;
  padding: 10px 24px;
  margin-bottom: 34px;
`
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`
const Header = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 24px;
`
const Text = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 26px;
`
const ButtonContainer = styled.div`
  display: flex;
`
const StyledSubmitButton = styled(Button)`
  width: 190px;
`
const StyledCancelButton = styled(StyledSubmitButton)`
`
const DeleteIconWrapper = styled.div`
  cursor: pointer;
  margin-left: 9px;
`
const UploadTextFileWrapper = styled.div`
  width: 100%;
`
export interface UploadProps
  extends Omit<KitUploadProps, 'fileList' | 'setFileList' | 'onChange' | 'onBlur' | 'customRequest' | 'name'>
{
  name: string
  validate?: FieldValidator<UploadFile[]>
  readOnly?: boolean
  onChange?: (value: UploadFile[]) => void
  maxSize?: number
  bordered?: boolean
  confirmClear?: boolean
  link?: string
}

const FieldNameUpload = {
  SIGNING_RIGHT_DOCUMENT: 'signingRightDocument' ||
    'SigningRightDocument' || 
    'SigningCertificate' ||
    'signingCertificate',
  STATE_REGISTRATION_DOCUMENT: 'stateRegistrationDocumentLink' ||
    'StateRegistrationDocumentLink' ||
    'StateRegistrationCertificate' ||
    'stateRegistrationCertificate',
}

const getFileName = (field: string): string => {
  switch (field) {
    case FieldNameUpload.SIGNING_RIGHT_DOCUMENT:
      return 'Документ, подтверждающий право подписи.pdf'
    case FieldNameUpload.STATE_REGISTRATION_DOCUMENT:
      return 'Документ о государственной регистрации организации.pdf'
    default:
      return 'Документ.pdf'
  }
}

function Upload({
  name,
  validate,
  onChange,
  multiple,
  accept,
  maxSize,
  bordered = false,
  beforeUpload,
  confirmClear,
  link,
  disabled,
  ...props
}: UploadProps) {
  const { open, data } = useDialog<ConfirmClear>('CONFIRM_CLEAR_DIALOG')
  const { markValid, readOnly, ...derivedProps } = useDerivedFieldProps(props)

  const form = useForm()
  const field = useField<UploadFile[]>(name, { validate, subscription: fieldSubscription })
  const { value, change, blur } = field
  const error = field.error ?? field.submitError

  const handleChange = useCallback<ChangeHandler>(value => {
    change(value)
    onChange?.(value)
  }, [])

  const displayError = shouldDisplayFieldError(field)

  const [uploadFailedMsg, setUploadFailedMsg] = useState<string>('')
  const handleBeforeUpload = useCallback<BeforeUploadHandler>(file => {

    if (accept) {
      const format = file.name.split('.').pop() as string
      const acceptFormats = accept.split(',')?.map(f => f.toLowerCase())
      if (!acceptFormats.includes(format)) {
        setUploadFailedMsg(
          'Неверный формат файла, ' + (
            acceptFormats.length === 1
              ? 'загрузите файл формата ' + acceptFormats[0].toUpperCase()
              : 'допустимые форматы файла: ' + acceptFormats?.map(f => f.toUpperCase()).join(', ')
          )
        )
        return AntDUpload.LIST_IGNORE
      }
    }

    if (maxSize) {
      if (file.size > (maxSize * 1024 * 1024)) {
        setUploadFailedMsg(`Максимальный размер загружаемого файла ${maxSize}Мб`)
        return AntDUpload.LIST_IGNORE
      }
    }

    setUploadFailedMsg('')
    return beforeUpload?.(
      file,
      form?.getFieldState(name)?.value as Parameters<BeforeUploadHandler>[1]
    ) ?? true

  }, [accept, maxSize, name, beforeUpload])

  const valueIsString = typeof value === 'string' && String(value).length > 0

  const inputProps: KitUploadProps = {
    setFileList: handleChange,
    fileList: valueIsString ? [value] : value,
    customRequest: () => undefined,
    accept,
    beforeUpload: handleBeforeUpload,
    // @ts-expect-error
    onBlur: blur,
  }

  const disableUpload = !multiple && (value ?? []).length > 0 ? true : false
    
  return (
    <UploadWrapper disableUpload={disableUpload}>
      <KitUpload
        {...derivedProps}
        {...inputProps}
        disabled={disabled}
        error={uploadFailedMsg.length > 0}
        customItemRender={(file, index) => {
          return valueIsString ? (
            <FileItem key={index} bordered={bordered} error={file.error}>
              {bordered && <Icon type='clip' color={palette.GRAY_DARK} />}
              <UploadTextFileWrapper>
                <Link isUploadStyle openFile title={getFileName(name)} to={file as unknown as string} />
              </UploadTextFileWrapper>
              <IconsContainer>
                <Icon type='check' width={12.5} height={12.5} color={palette.GREEN_2} />
                {!disabled && 
                  <DeleteIconWrapper
                    onClick={() => {
                      confirmClear 
                        ? openDialog('CONFIRM_CLEAR_DIALOG', { file: getFileName(name) , newValue: [], change })
                        : change([])
                      onChange && onChange([])
                    }}
                  >
                    <Icon 
                      type='trash'
                      color={palette.GRAY_DARK}
                      width={12}
                      height={12}
                    />
                  </DeleteIconWrapper>
                }
              </IconsContainer>
              
            </FileItem>
          ) : (
            <FileItem key={index} bordered={bordered} error={file.error}>
              {bordered && <Icon type='clip' color={palette.GRAY_DARK} />}
              <FileName>{file.name}</FileName>
              <IconsContainer>
                <Icon type='check' width={12.5} height={12.5} color={palette.GREEN_2} />
                {!disabled && 
                  <DeleteIconWrapper
                    onClick={() => {
                      const newValue = [
                        // @ts-ignore
                        ...value?.slice(0, index),
                        ...value?.slice(index + 1),
                      ]
                      confirmClear  
                        ? openDialog('CONFIRM_CLEAR_DIALOG', { file: file.name, newValue, change })
                        : change(newValue)

                      onChange && onChange(newValue)
                    }}
                  >
                    <Icon 
                      type='trash'
                      color={palette.GRAY_DARK}
                      width={12}
                      height={12}
                    />
                  </DeleteIconWrapper>
                }
              </IconsContainer>
            </FileItem>
          )
        }}
      />
      {(displayError || uploadFailedMsg) && (
        <div style={{ color: palette.RED, marginTop: '12px', fontSize: '14px', fontWeight: 500 }}>
          {uploadFailedMsg || error}
        </div>
      )}
      <StyledModal 
        width={651}
        border
        closable
        maskClosable
        visible={open}
        onCancel={() => closeDialog()}
      >
        <Header>Удаление документа</Header>
        <Text>Вы действительно хотите удалить документ:</Text>
        <FileWrapper>
          <File>
            <Icon type='clip' color={palette.GRAY_DARK} />
            <FileName>{data?.file}</FileName>
          </File>
        </FileWrapper>
        
        <ButtonContainer>
          <StyledSubmitButton size='S'
            onClick={() => {
              data?.change(data?.newValue)
              closeDialog()
            }}
          >
            Удалить документ
          </StyledSubmitButton>
          <StyledCancelButton size='S' onClick={() => closeDialog()} type='unbordered'>
            Отменить
          </StyledCancelButton>
        </ButtonContainer>
      </StyledModal>
    </UploadWrapper>
  )
}

const MemoUpload = React.memo(Upload) as typeof Upload

export default MemoUpload
