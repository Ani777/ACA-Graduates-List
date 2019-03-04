import React from 'react';
import Paper from '@material-ui/core/Paper';
import MuiVirtualizedTable from './GraduatesListForCompanies';


const data = [
    ['Astghik', 'Khachatryan', 6.0, 'js'],
    ['Ani', 'Grigoryan', 9.0, 'js'],
    ['Mariam', 'Mamikonyan', 16.0, 'js'],
    ['Shushan', 'Injigulyan', 3.7, 'js'],
    ['Poshos', 'Poghosyan', 16.0, 'js'],
];

let id = 0;
function createData(dessert, calories, fat, carbs, protein) {
    id += 1;
    return { id, dessert, calories, fat, carbs, protein };
}
const rows = [];

for (let i = 0; i < 200; i += 1) {
    const randomSelection = data[Math.floor(Math.random() * data.length)];
    rows.push(createData(...randomSelection));
}

function ReactVirtualizedTable() {
    return (
        <Paper style={{ height: 550, width: '96%', margin: '2%' }}>
            <MuiVirtualizedTable
                rowCount={rows.length}
                rowGetter={({ index }) => rows[index]}
                onRowClick={event => console.log(event)}
                columns={[
                    {
                        width: 120,
                        flexGrow: 1.0,
                        label: 'First Name',
                        dataKey: 'dessert',
                    },
                    {
                        width: 120,
                        flexGrow: 1.0,
                        label: 'Last Name',
                        dataKey: 'calories',
                    },
                    {
                        width: 200,
                        flexGrow: 1.0,
                        label: 'Course',
                        dataKey: 'carbs',
                        alignRight: true,
                    },
                    {
                        width: 200,
                        label: 'Test Results',
                        dataKey: 'fat',
                        alignRight: true,
                    },
                ]}
            />
        </Paper>
    );
}

export default ReactVirtualizedTable;