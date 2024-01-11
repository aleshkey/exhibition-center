import {useEffect, useState} from "react";

export function GetJson(url){
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [url]);

    return data;
}

export function convertToNormalCase(camelCaseString) {
    return camelCaseString
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Вставляем пробелы между буквами
        .replace(/\b[a-z]/g, function (firstLetter) {
            return firstLetter.toUpperCase(); // Преобразуем первую букву каждого слова в верхний регистр
        });
}