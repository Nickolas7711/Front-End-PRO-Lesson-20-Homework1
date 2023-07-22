const parseData = (children) => JSON.parse(children);

const fetchData = (url, onSuccess, onError) => {
    const xml = new XMLHttpRequest();
    xml.open('GET', url);
    xml.send();

    xml.onload = () => {
        if (xml.status === 200) {
            onSuccess(parseData(xml.responseText));
        } else {
            onError(new Error('Виникла помилка під час завантаження даних'));
        }
    };

    xml.onerror = () => {
        onError(new Error('Виникла помилка під час виконання запиту'));
    };

    
};

const combineChildrenArrays = (data, data2) => {
    const combinedChildren = data.children.concat(data2.children);
    return combinedChildren;
};

const fetchDataAndCombineChildren = () => {
    try {

        fetchData(
            'request/data.json',
            (data) => {
            fetchData(
                'request/data2.json',
                (data2) => {
                const combinedChildren = combineChildrenArrays(data, data2);

                console.log(combinedChildren);
            },
            (error) => {
                console.error('Виникла помилка при завантаженні data2.json:', error);
            }
            );
            },
            (error) => {
            console.error('Виникла помилка при завантаженні data.json:', error);
            });
    } catch (error) {
        console.error('Виникла помилка:', error);
    }
};
fetchDataAndCombineChildren();