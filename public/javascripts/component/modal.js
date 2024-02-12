export class modalClass {
    modalElement(heading, content) {
        let modal = `<div class="modal-container">
        <div class="modal-body">
         <div class="modal-header">
             <h3>${heading || `Modal Heading`}</h3>
             <i class="fa-solid fa-xmark"></i>
         </div>
         <div class="modal-contents">
             ${content || `<p>This is where the contents of the modal will reside; this division can include things like buttons and other text tags</p>`}
         </div>
        </div> 
     </div>`
        return modal
    }
    init() {
        let modalContainer = document.querySelector('.modal-container')
        let modalBody = document.querySelector('.modal-body')
        let closeBtn = document.querySelector('.fa-xmark')
        return {
            modalContainer,
            modalBody,
            closeBtn
        }
    }

    open(heading, content) {
        if(document.querySelector('.modal-container')){
            return
        }
        document.body.insertAdjacentHTML("afterbegin", this.modalElement(heading, content))
        let {
            modalContainer,
            closeBtn
        } = this.init()
        modalContainer.style.opacity = "1"
        closeBtn.addEventListener("click", ()=>{
            this.close()
        })
    }

    close() {
        let {
            modalContainer
        } = this.init()
        modalContainer.remove()
    }
}