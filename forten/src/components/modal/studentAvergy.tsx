import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Wrapper = styled.div`
  width: 18.75rem;
  height: 16rem;
  margin-bottom: 1rem;
`

const CenterContainer = styled.div`
  display: flex;
  align-items: center;

`

const Explan = styled.p`
  font-size: 1rem;
  font-weight: 900;
`

interface StudentAvergyProps {
    studentId: number;
}

// 학생 평가 도넛 그래프 컴포넌트
function StudentAvergy(props: StudentAvergyProps) {
    // useState의 labels에 api에서 이름을 받아오면 될 것 같음
    // api에서 오는 데이터가 추가 되면 
    // const [labels, setLabels] = useState([]);
    const [series, setSeries] = useState([]);

    let options: ApexOptions = {
        chart: {
            type: 'donut',
            width: '400',
            height: '200',
        },
        // labels: labels || [],
        series: series || [],
        //  labels: labels || [],
        dataLabels: {
            enabled: false,
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Axios를 사용하여 데이터를 가져오는 API 엔드포인트로 요청을 보냅니다.
                const response = await axios.get(`http://3.37.41.244:8000/api/analysis/${props.studentId}/`);

                // 서버에서 받아온 데이터를 적절히 가공하여 labels와 series를 업데이트합니다.
                console.log(response.data.result.student_rating);
                // const newDataLabels = response.data.labels;
                // const newSeriesData = response.data.series;

                const studentRating = response.data.result.student_rating;

                setSeries(studentRating);
                // setLabels(newDataLabels);
                // setSeries(newSeriesData);

            } catch (error) {
                console.error('[강사] 학생 평가 파이차트', error);
            }
        };

        // 컴포넌트가 마운트될 때 데이터를 가져오기 위해 useEffect 내에서 fetchData를 호출합니다.
        fetchData();
    }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행


    return (
        <Wrapper>
            <Explan>학생 평가 점수</Explan>
            <CenterContainer>
                <Chart
                    options={options}
                    series={options.series}
                    labels={options.labels}
                    type='donut'
                />
            </CenterContainer>
        </Wrapper>
    )
}

export default StudentAvergy;
