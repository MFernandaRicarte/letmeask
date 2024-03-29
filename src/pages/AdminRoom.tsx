import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useHistory, useParams } from 'react-router-dom';
import '../styles/room.scss';
//import { useAuth } from '../hooks/useAuth';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg';
import { database } from '../services/firebase';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';


type RoomParams = {
    id: string;
}

export function AdminRoom(){
    //const {user} = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const history = useHistory();
    const { questions, title } = useRoom(roomId)

    async function handleEndRoom() {
        if (window.confirm('Tem certeza que deseja encerrar essa sala?')){
            await database.ref(`rooms/${roomId}`).update({
                endedAt: new Date(),
            })
        }

        history.push('/')
    }

    async function handleDeleteQuestion(questionId:string){
        if (window.confirm('Tem certeza que deseja excluir essa pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswered (questionId:string) {
        
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered:true,
        })
    }

    async function handleHighlightQuestion(questionId:string) {
        
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted:true,
        })
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="imagem logo" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>

                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                    <button
                                    type='button'
                                    onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                        <img src={checkImg} alt="pergunta já respondida" />
                                    </button>
                                    <button
                                    type='button'
                                    onClick={() => handleHighlightQuestion(question.id)}>
                                        <img src={answerImg} alt="pergunta a ser respondida" />
                                    </button>
                                    </>
                                )}
                                <button
                                    type='button'
                                    onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="deletar pergunta" />
                                </button>
                            </Question>
                            )
                        }
                    )}
                </div>

            </main>
        </div>
    )
}