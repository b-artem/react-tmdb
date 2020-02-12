import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input } from 'antd'

const alphanumericRegExp = /^[0-9a-zA-Z ]+$/
const errorMessage = 'Should be combination of numbers & alphabets'

// eslint-disable-next-line react/prefer-stateless-function
class BaseCreateListModal extends React.Component {
  render() {
    const {
      visible, onCancel, onOk, form
    } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        okText="Create"
        title="Create list"
      >
        <Form>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, pattern: alphanumericRegExp, message: errorMessage }]
            })(
              <Input placeholder="Name" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('description', {
              rules: [{ required: true, pattern: alphanumericRegExp, message: errorMessage }]
            })(
              <Input placeholder="Description" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

BaseCreateListModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired
  }).isRequired
}

const CreateListModal = Form.create()(BaseCreateListModal)

export default CreateListModal
