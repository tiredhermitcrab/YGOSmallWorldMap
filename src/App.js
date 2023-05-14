import {Navbar, Container, Row, Col, Button, Nav, ListGroup, Form, Stack} from "react-bootstrap";
import {useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import cardDB from './cardDB';

const cards = cardDB.get();

const recentUpdate = '2023/05/14'

function App() {

  const [mode, changeMode] = useState('Map')
  const [mapView, changeMapView] = useState(true);
  const [monsters, updateMonsters] = useState([])
  const [mapMode, changeMapMode] = useState('start')
  const [swList, updateswList] = useState([])
  const [selectedCard, changeSelect] = useState('All')
  const inputDeckRef = useRef(null);
  const cardRef = useRef(null);

  const states = {
    mode: mode,
    changeMode: changeMode,
    mapView: mapView,
    changeMapView: changeMapView,
    monsters: monsters,
    updateMonsters: updateMonsters,
    mapMode: mapMode,
    changeMapMode: changeMapMode,
    swList: swList,
    updateswList: updateswList,
    selectedCard: selectedCard,
    changeSelect: changeSelect,
    inputDeckRef: inputDeckRef,
    cardRef: cardRef,
  }

  return (
    <>
      <Navbar variant='dark' bg='dark' sticky='top'>
        <Navbar.Brand style={{marginLeft:'20px'}}>스몰 월드</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link onClick={()=>{changeMode('Map')}}>루트</Nav.Link>
          {/*<Nav.Link onClick={()=>{changeMode('Search')}}>검색</Nav.Link>*/}
        </Nav>
      </Navbar>
      <Content states={states} />
    </>
  );
}


function Content(props) {

  const states = props.states;

  if (states.mode === 'Map') {
    let kdeck = [];
    let deck = [];

    function makeMap() {
      states.changeMapView(true);
      states.updateswList([]);
      states.changeSelect('All')
      kdeck = states.inputDeckRef.current.value.trim().split('\n').filter(name => {return !!cards[cardDB.translate(name)]});
      deck = kdeck.map((name) => cardDB.translate(name))
      makeList();
      states.updateMonsters(kdeck)
    }

    function mapMode(mode) {
      states.changeMapMode(mode);
    }

    function makeList() {
      const result = [];
      const deckCards = deck.map((name) => cards[name]);

      deckCards.forEach(startCard => {
        const bridges = deckCards.filter(card => swMatch(startCard, card));
        bridges.forEach(bridgeCard => {
          const goals = deckCards.filter(card => swMatch(bridgeCard, card))
          goals.forEach((goalCard) => {
            if (startCard.name !== goalCard.name) result.push([cardDB.translateR(startCard.name), cardDB.translateR(bridgeCard.name), cardDB.translateR(goalCard.name)]);
          })
        });
      })
      
      console.log(result)
      states.updateswList(result);
    }

    function swMatch(card1, card2) {
      const swkey = ['race','attribute','level','atk','def'];
      let count = 0;
      swkey.forEach(k => {
        if(card1[k]===card2[k]) count++;
      });
      return count===1;
    }

    return (
      <Container style={{marginTop:'10px'}}>
        <Row><h1>스몰 월드 루트 찾기 - 덱 입력</h1></Row>
        <Row>
          <Form.Control as='textarea' ref={states.inputDeckRef} style={{minHeight:'300px', margin:'10px'}} aria-describedby='mapHelp' placeholder='하루 우라라&#10;증식의 G&#10;저택 와라시&#10;원시생명체 니비루&#10;참기 서큘러&#10;참기 시그마&#10;마이크로 코더&#10;...'/>
          <Form.Text id='mapHelp' muted>
            한 줄에 메인 덱 몬스터 하나씩을 입력하세요. {recentUpdate} 이전 마스터 듀얼에 업데이트된 카드까지 지원합니다.
          </Form.Text>
        </Row>
        <Row style={{marginTop:'10px'}}>
          <Col><Button onClick={()=>{makeMap()}}>루트 찾기!</Button></Col>
        </Row>
        <Row style={{visibility:states.mapView?'visible':'hidden', marginTop:'10px'}}>
          <Stack direction='horizontal' gap={3}>
            <Form.Select style={{minWidth:'300px'}} ref={states.cardRef} onChange={(e) => {
              states.changeSelect(e.target.value)
            }}>
              <option value='All'>전체 보기</option>
              {states.monsters.map((monster)=>{return (<option value={monster}>{monster}</option>)})}
            </Form.Select>
            <ListGroup horizontal>
              <ListGroup.Item action active={states.mapMode==='start'} onClick={()=>{mapMode('start')}}>이 몬스터로 시작하는</ListGroup.Item>
              <ListGroup.Item action active={states.mapMode==='end'} onClick={()=>{mapMode('end')}}>이 몬스터로 끝나는</ListGroup.Item>
            </ListGroup>
          </Stack>
        </Row>
        <Row>
          <Col>
            <Row>
              {
                states.swList.length === 0?<h5>아무 루트도 없어요 ㅠㅠ</h5>:<h5>총 {(states.selectedCard === 'All')?states.swList.length:(states.mapMode === 'start')?states.swList.filter((result)=>result[0]===states.selectedCard).length:states.swList.filter((result)=>result[2]===states.selectedCard).length}개의 루트!</h5>
              }
              {
                states.swList.map((result) => {
                  if (states.selectedCard === 'All') {
                    return (
                      <h5>
                        {result[0]} =&gt; {result[1]} =&gt; {result[2]}
                      </h5>
                    )
                  }
                  if (states.mapMode === 'start') {
                    if (result[0] !== states.selectedCard) return (<></>);
                  } else {
                    if (result[2] !== states.selectedCard) return (<></>);
                  }
                  return (
                    <h5>
                      {result[0]} =&gt; {result[1]} =&gt; {result[2]}
                    </h5>
                  )
                })
              }
            </Row>
          </Col>
        </Row>
      </Container>
    )
  } else if (states.mode === 'Search') {
    return (
      <>
        Search?
      </>
    )
  } else {
    return (
      <>
        Something went wrong...
      </>
    )
  }
}






export default App;
