import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import React from "react";
import {useThemeContext} from "../../../context/CustomTheme/CustomThemeContext.jsx";


export default function ClearLocationBadge({locationNameForSearch, handleReset}) {

    const {isDarkMode} = useThemeContext();

    return(
        <Box className={"locationDeleteBadge"}
             sx={{
                 display: 'flex',
                 alignItems: 'center',
                 width: '150px',
                 height: '40px',
                 justifyContent: 'space-between',
                 mt: 2,
                 p: 1,
                 opacity: 0.8,
                 backgroundColor: isDarkMode ? '#424242' : '#f5f5f5',
                 borderRadius: '8px',
                 position: 'absolute', // Абсолютное позиционирование
                 right: '16px', // Отступ от правого края Container
                 top: '110px',
                 maxWidth: '150px', // Ограничиваем максимальную ширину Box
                 overflow: 'hidden', // Скрываем содержимое за пределами Box
                 border: '1px solid',
                 borderColor: isDarkMode ? "rgba(210,210,210,0.65)" : "rgba(47,155,255,0.53)", // полупрозрачный фон

             }}
        >
            <Typography
                sx={{
                    fontSize: 16,
                    fontWeight: 500,
                    mr: 1,
                    whiteSpace: 'nowrap',       // Запрещаем тексту переноситься на следующую строку
                    overflow: 'hidden',        // Скрываем текст, выходящий за пределы контейнера
                    textOverflow: 'ellipsis',  // Добавляем многоточие для длинного текста
                    maxWidth: '100%',          // Ограничиваем ширину текста до размеров родителя (Box)
                }}
            >
                {locationNameForSearch}
            </Typography>
            <IconButton size="small" onClick={handleReset}
                        sx={{
                            mr: -1.5,
                            '&:hover': {
                                backgroundColor: 'transparent', // Отключаем фон при наведении
                                transform: 'scale(1.1)',
                            },
                            '&:active': {
                                backgroundColor: 'transparent', // Убираем нажимание
                            },
                            '&:focus': {
                                outline: 'none', // Убираем фокус

                            },
                        }}>
                <CloseIcon fontSize="small"/>
            </IconButton>
        </Box>
    )
}