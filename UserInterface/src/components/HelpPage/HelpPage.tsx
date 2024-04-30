import React from "react";
import './HelpPage.scss';
import { ModalContent } from "../Modal/Modal";

const HelpPage = ({ onClose }: ModalContent) => {
	return (
		<div className="HelpPage">
			<header>
				<h1>Справка программы КОНФИГУРАТОР</h1>
			</header>
			<main>
				<section>
					<h2>Введение</h2>
					<article>
						<h3>Назначение программы КОНФИГУРАТОР</h3>
						<p>
							Основное назначение программы - ввод и вывод
							настроечных параметров в приборы коммерческого
							учета, изготовленных АО НПФ ЛОГИКА и его
							лицензиатами. Программа работает с батарейными и
							многофункциональными приборами 4-го, 5-го и 6-го
							поколений.
						</p>
					</article>
					<article>
						<h3>Системные требования</h3>
						<p>
							<ul>
								<li>Операционная система Windows 7, 8, 10;</li>
								<li>
									установленный Microsoft .NET Framework
									4.7.2;
								</li>
								<li>
									объём свободного дискового пространства от
									10 Мб;
								</li>
								<li>
									один свободный последовательный порт (не
									требуется при подключении посредством
									адаптера АПС71 или АПС81).
								</li>
							</ul>
						</p>
					</article>
					<article>
						<h3>Список поддерживаемых приборов</h3>
						<p>
							В текущей версии программы КОНФИГУРАТОР
							поддерживаются следующие типы приборов:
						</p>
						<p>
							<ul>
								<li>ЛГК410;</li>
								<li>СПЕ543;</li>
								<li>СПГ740;</li>
								<li>СПГ742;</li>
								<li>СПГ761 - модель 761.2;</li>
								<li>СПГ762 - модель 762.2;</li>
								<li>СПГ763 - модель 763.2;</li>
								<li>СПТ940;</li>
								<li>СПТ941 - модель 941.20;</li>
								<li>СПТ943 - модель 943.1;</li>
								<li>СПТ944;</li>
								<li>СПТ961 - модели 961.1, 961.2;</li>
								<li>СПТ962;</li>
								<li>СПТ963.</li>
							</ul>
						</p>
					</article>
				</section>

				<section>
					<h2>Работа с программой</h2>
					<article>
						<h3>Настройки программы</h3>
						<p>
							Вызов окна настроек подключения или окна настроек
							общих параметров осуществляется из одноименных меню.
							При первом запуске программы предлагается настроить
							подключение для работы.
						</p>
						<p>
							В этом окне пользователь выбирает порт, к которому
							подключается прибор, и каталог, куда будут
							сохраняться файлы с настроечными параметрами
							приборов. Чтобы файлы считанных баз данных
							автоматически сохранялись непосредственно после
							считывания необходимо отметить соответствующий пункт
							в настройках.
						</p>
						<p>
							Предусмотрена возможность подключения к приборам по
							TCP или UDP по IP адресу (или доменному имени) и
							порту. Также возможно подключаться к приборам с
							помощью модема. Для этого нужно выбрать название
							модема, указать скорость подключения и ввести номер
							телефона.
						</p>
						<p>
							Программа позволяет устанавливать текущие дату и
							время в приборе учета, основываясь на показаниях
							внутренних часов компьютера. Чтобы эта операция
							проводилась при каждой записи БД необходимо отметить
							соответствующий пункт в настройках.
						</p>
					</article>
					<article>
						<h3>Доступные функции</h3>
						<p>Программа позволяет выполнять следующие действия:</p>
						<p>
							<ul>
								<li>
									прочитать настроечные параметры (БД)
									прибора;
								</li>
								<li>сохранить БД прибора в файл;</li>
								<li>загрузить БД из файла в прибор;</li>
								<li>
									вывести полный список настроечных параметров
									на печать;
								</li>
								<li>
									прочитать, записать и изменить отдельные
									настроечные параметры;
								</li>
								<li>подготовить новую БД.</li>
							</ul>
						</p>
						<div>
							<h4>Чтение настроечных данных из прибора</h4>
							<p>
								Чтение (загрузка) полного списка настроечных
								данных из прибора осуществляется по команде
								"Считать БД из прибора" из меню "Файл", либо по
								нажатию кнопки на панели инструментов. Еще один
								вариант - использование сочетания клавиш{" "}
								<code>Ctrl+D</code>.
							</p>
							<p>
								Далее программа определит тип подключенного
								прибора, его заводской номер, и считает значения
								параметров БД. Если в настройках программы
								отмечен пункт "Автоматическое сохранение
								считанных БД в файл", то после чтения будет
								предложено сохранить полученные данные. Название
								файла дается автоматически и состоит из
								обозначения типа прибора, подчеркивания и
								заводского номера прибора. Предусмотрена
								возможность дать название сохраняемому файлу
								после считывания БД.
							</p>
							<p>
								Если прибор не обнаружен, то выдается сообщение
								"нет ответа прибора". В этом случае следует
								проверить настройки программы и правильность
								подключения приборов.
							</p>
							<p>
								В программе предусмотрена возможность загрузки
								одного или нескольких параметров по выбору
								пользователя. Для этого следует выделить (с
								использованием клавиш <code>Shift</code> или{" "}
								<code>Ctrl</code>) только те параметры, которые
								требуется считать из прибора. Далее вызвать
								правой клавишей мыши контекстное меню, в котором
								выбрать строку "Прочитать параметры".
							</p>
						</div>
						<div>
							<h4>Загрузка БД в прибор</h4>
							<p>
								Запись (загрузка) полного списка настроечных
								данных в прибор осуществляется по команде
								"загрузить БД в прибор" из меню "Файл", либо по
								нажатию кнопки на панели инструментов. Еще один
								вариант - использование сочетания клавиш{" "}
								<code>Ctrl+U</code>.
							</p>
							<p>
								Также предусмотрена возможность загрузки в
								прибор одного или нескольких параметров по
								выбору пользователя. Для этого следует выделить
								(с использованием клавиш <code>Shift</code> или{" "}
								<code>Ctrl</code>) только те параметры, которые
								требуется записать в прибор. Далее необходимо
								вызвать правой клавишей мыши контекстное меню, в
								котором выбрать строку "Записать параметры".
							</p>
							<p>
								Если в списке загружаемых в прибор параметров
								оказываются незаполненные значения, то в
								процессе записи эти параметры обходятся, их
								значения в приборе не изменяются.
							</p>
							<p>
								Предусмотрен контроль ошибок при записи
								параметров. Параметры, которые не удалось
								записать отмечены красным цветом. Снятие
								выделения выполняется двойным нажатием мышкой по
								строке.
							</p>
							<p>
								<strong>Внимание!</strong> При загрузки БД из
								ранее сохраненного файла в многофункциональные
								приборы не записываются параметры 001, 003, 004,
								008, 026, 027, 029 и 045-049. Их необходимо
								записывать вручную.
							</p>
						</div>
						<div>
							<h4>
								Сохранение и открытие файла с настроечными
								параметрами
							</h4>
							<p>
								Для операции сохранения и открытия файлов,
								содержащих настроечные параметры прибора,
								предусмотрены одноименные команды из меню "Файл"
								и кнопки на панели инструментов.
							</p>
							<p>
								Если в настройках программы отмечен пункт
								"Автоматическое сохранение считанных БД в файл",
								то после чтения будет предложено записать
								полученные данные. Название файла дается
								автоматически и состоит из обозначения типа
								прибора, нижнего подчеркивания и заводского
								номера прибора. Можно сохранять данные
								автоматически, отметив соответствующий пункт в
								настройках.
							</p>
						</div>
						<div>
							<h4>Подготовка новой БД</h4>
							<p>
								Программа позволяет создать новую БД "с нуля".
								После нажатия кнопки и выбора типа прибора в
								окне программы появиться полный список
								обозначений настроечных параметров и их краткое
								описание. При необходимости получить болеe
								полное описание следует обратиться к руководству
								по эксплуатации прибора.{" "}
							</p>
							<p>
								Пользователь имеет возможность вводить в столбце
								значения параметров в любом порядке, однако,
								рекомендуется начинать с назначения схем
								потребления. Допускается оставлять столбец
								"значение" незаполненным. В этом случае, в
								процессе записи в прибор этот параметр будет
								пропущен и его значение в приборе не изменится.
							</p>
							<p>
								Имеется возможность вводить "пустое" значение
								некоторых параметров, отображаемое на дисплее
								тепловычислителя как "#н/д" (нет данных) или
								"Нет данных?". В поле ввода программы такое
								значение можно набрать, воспользовавшись
								клавиатурой компьютера. Но быстрее будет
								использовать сочетание клавиш{" "}
								<code>Ctrl+N</code>.
							</p>
							<p>
								Строки таблицы с модифицированными параметрами,
								которые не сохранены в прибор или файл,
								обозначаются синим цветом.
							</p>
							<p>
								В любое время редактируемую БД можно сохранить в
								файл на диске компьютера.
							</p>
						</div>
						<div>
							<h4>Фильтрация параметров при просмотре БД</h4>
							<p>
								Команда фильтра и выбор пунктов в дереве
								параметров осуществляют отбор показываемых
								пользователю параметров.
							</p>
							<p>
								При выключенном режиме фильтрации пользователю
								показываются все параметры, которые имеют
								выбранное в дереве параметров название. При
								включенном фильтре показываются эти параметры
								только для выбранного канала.
							</p>
						</div>
						<div>
							<h4>Информация о приборе</h4>
							<p>
								Кнопка "i" выполняет считывание основной
								информации о приборе: заводкой номер,
								идентификатор.
							</p>
						</div>
						<div>
							<h4>Вывод БД на печать</h4>
							<p>
								Команда Печать из меню "Файл" или сочетание
								клавиш <code>Ctrl+P</code> открывают приложение
								по просмотру PDF-файлов. В этом приложении будет
								открыт сгенерированный отчет со всеми
								параметрами прибора и их значениями.
							</p>
							<p>
								Предусмотрена возможность печати только видимых
								параметров.
							</p>
							<p>
								Изменение формата представления этого списка не
								предусмотрено.
							</p>
						</div>
					</article>
				</section>
			</main>

			<footer>
				<p>АО НПФ ЛОГИКА, 2022</p>
			</footer>
		</div>
	);
};

export default HelpPage;