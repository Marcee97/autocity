import "../styles/modal.css";

export const Modal = ({onModal, tiempo, formato, setOnModal, detenerLavado}) => {
  return (onModal && (

    <section className="modal">
    <div className="cont-modal">
    <h2>¿Terminar Lavado?</h2>
    <p>{formato(tiempo)}</p>
    <div className="cont-buttons">
    <button className="modal-buttons" onClick={detenerLavado}>Si</button>
    <button className="modal-buttons" onClick={() => setOnModal(false)}>No</button>
    </div>
    </div>
  
    </section>)
  )
}
