import { Modal, Portal } from 'react-native-paper'
import styles from "../../styles/addPizza.style"
import PizzaForm from './PizzaForm'


const PizzaModal = ({ visible, onClose, mode = "create", pizza = null }) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
                <PizzaForm
                    mode={mode}
                    pizza={pizza}
                    onClose={onClose}
                />
            </Modal>
        </Portal>
    )
}

export default PizzaModal