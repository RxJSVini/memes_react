import React,{ useState, useEffect} from 'react';
import { Wrapper, Card, Templates, Form, Button } from '../../styles/styles';
import logo from '../../logo.svg';
import { toast } from 'react-toastify';
import qs from 'qs';



export default function Home(){
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [boxes, setBoxes] = useState([]);    
    const [generatedMeme, setGeneratedMeme]= useState(null); 
    useEffect(() => {
        (async () => {
          const resp = await fetch('https://api.imgflip.com/get_memes');
          const { data: { memes } } = await resp.json();
          setTemplates(memes);
        })();
      }, []);


    async function handlerSubmit(e){
        e.preventDefault();
        const params = qs.stringify({
            template_id:selectedTemplate.id,
            username:'vikayel543',
            password:'vikayel543',
            boxes:boxes.map(text =>({ text }))
        })
        
        const resp = await fetch(`https://api.imgflip.com/caption_image?${params}`);
        const {data:{ url }}= await resp.json();
        toast.success('Meme gerado com sucesso!');
        setGeneratedMeme(url);

    }

    // curryng -> função que retorna outra função
    const handleInputChange = (index) => (e) =>{
        const newValues = boxes;
        newValues[index] = e.target.value;
        setBoxes(newValues)
    }

    function handlerReset(){
        setSelectedTemplate(null)
        setBoxes([])
        setGeneratedMeme(null)
    }

    return(
        <>
        
            <Wrapper>
                
                <img src={logo} alt="MemeMaker"/>
                <Card>
                    {generatedMeme && (
                        <>
                                
                            <img src={generatedMeme} alt="Generated Meme"/>
                            
                            <Button onClick={handlerReset}>Criar outro meme</Button>
                        
                    
                        </>
                    )}
                    {!generatedMeme && (
                        <>
                        
                        <h2>Selecione um template</h2>
                    <Templates>
                        {templates.map((template) =>(

                            <button type="button" key={template.id} onClick={ () => setSelectedTemplate(template)} className={template.id === selectedTemplate?.id ? 'selected' : ''} >
                                
                                <img src={template.url} alt={template.name}/> 

                            </button>


                        ))}
                        

                    </Templates>
                    <h2>Textos</h2>
                    { selectedTemplate && (
                                            
                        <Form onSubmit={handlerSubmit}>
                            {(new Array(selectedTemplate.box_count)).fill('').map((_,index) =>(
                                                    
                                <input key={String(Math.random())} placeholder={`Text #${index + 1}`}  onChange={handleInputChange(index)}/>
                                                    
                            ))}
                        
                            <Button>MakeMyMeme!</Button>
                        </Form>
                    )}
                
                        
                        </>
                    )}
                </Card>
            </Wrapper>
            
        
        </>
    )
}