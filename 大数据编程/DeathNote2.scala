import org.apache.spark.SparkContext
import org.apache.spark.SparkConf
import org.apache.spark.sql.{Column, DataFrame, Row, SparkSession}
import org.apache.spark.sql.functions._

import scala.collection.mutable
import java.text.SimpleDateFormat

import org.apache.calcite.schema.Statistic
import org.apache.hadoop.mapreduce.lib.db.DataDrivenDBInputFormat
import org.apache.spark.sql.types._

object DeathNote2 {
  def main(args: Array[String]): Unit ={
//    initialization
    val conf = new SparkConf().setAppName("DeathNote2").set("spark.testing.memory", "2147480000")
    val sc = new SparkContext(conf)
    val spark = SparkSession
      .builder()
      .appName("Spark SQL basic example")
      .config("spark.some.config.option", "some-value")
      .getOrCreate()
//    file path
    val filePath_dataOriginal = "/home/node0/data/annual_number_of_deaths_by_cause.csv"
    val filePath_dataCleanOut = "/home/node0/data/causes_of_death_clean_output.csv"
    val filePath_GDP = "/home/node0/data/gdp_csv.csv"
    val filePath_Countries = "/home/node0/data/countries.json"
    val filePath_population = "/home/node0/data/population.csv"
//    schema
    val schema_dataOriginal = StructType(mutable.ArraySeq(
      StructField("Entity", StringType, nullable = false),
      StructField("cca3", StringType, nullable = true),
      StructField("Year", IntegerType, nullable = false),
      StructField("Number of executions (Amnesty International)", IntegerType, nullable = true),
      StructField("Deaths - Meningitis - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Neoplasms - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Fire, heat, and hot substances - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Malaria - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Drowning - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Interpersonal violence - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - HIV/AIDS - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Drug use disorders - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Tuberculosis - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Road injuries - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Maternal disorders - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Lower respiratory infections - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Neonatal disorders - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Alcohol use disorders - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Exposure to forces of nature - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Diarrheal diseases - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Environmental heat and cold exposure - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Nutritional deficiencies - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Self-harm - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Conflict and terrorism - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Diabetes mellitus - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Poisonings - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Protein-energy malnutrition - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Terrorism (deaths)", IntegerType, nullable = true),
      StructField("Deaths - Cardiovascular diseases - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Chronic kidney disease - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Chronic respiratory diseases - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Cirrhosis and other chronic liver diseases - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Digestive diseases - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Acute hepatitis - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Alzheimer's disease and other dementias - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true),
      StructField("Deaths - Parkinson's disease - Sex: Both - Age: All Ages (Number)", IntegerType, nullable = true)
    ))
    val schema_dataCleanOut = StructType(mutable.ArraySeq(
      StructField("Causes name", StringType, nullable = false),
      StructField("Causes Full Description", StringType, nullable = true),
      StructField("Death Numbers", IntegerType, nullable = true),
      StructField("Entity", StringType, nullable = true),
      StructField("cca3", StringType, nullable = true),
      StructField("Year", IntegerType, nullable = false)
    ))
    val schema_GDP = StructType(mutable.ArraySeq(
      StructField("Country Name", StringType, nullable = false),
      StructField("cca3", StringType, nullable = true),
      StructField("Year", IntegerType, nullable = true),
      StructField("GDP", DoubleType, nullable = false)
    ))
    val schema_population = StructType(mutable.ArraySeq(
      StructField("Entity", StringType, nullable = false),
      StructField("cca3", StringType, nullable = true),
      StructField("Year", IntegerType, nullable = false),
      StructField("population", DoubleType, nullable = false)
    ))
//    original data
    val df_dataOriginal = spark.read.schema(schema_dataOriginal).option("header", "true").csv(filePath_dataOriginal)
    val df_dataCleanOut = spark.read.schema(schema_dataCleanOut).option("header", "true").csv(filePath_dataCleanOut)
    val df_GDP = spark.read.schema(schema_GDP).option("header", "true").csv(filePath_GDP)
    val df_CountriesOriginal = spark.read.format("json").option("multiline", "true").load(filePath_Countries)
    val df_population = spark.read.schema(schema_population).option("header", "true").csv(filePath_population)
//    df_Countries
    val df_Countries_part1 = df_CountriesOriginal.select(
      df_CountriesOriginal("cca3"),
      df_CountriesOriginal("latlng"),
      df_CountriesOriginal("region"),
      df_CountriesOriginal("subregion")
    ).where("cca3 is not null")
    val df_Countries_part3 = df_dataCleanOut.select(
      df_dataCleanOut("Entity"),
      df_dataCleanOut("cca3")
    ).distinct().where("cca3 is not null")
    val listRow = List(Row("America", "USA"), Row("East Timor", "TLS"), Row("Macau", "MAC"))
    val listRow_schema = df_Countries_part3.schema
    val listRowRDD = sc.makeRDD(listRow)
    val df_Countries_part4 = spark.createDataFrame(listRowRDD, listRow_schema)
    val df_Countries_part2 = df_Countries_part3.union(df_Countries_part4)
    val df_Countries = df_Countries_part1
      .join(df_Countries_part2, "cca3")
      .where("cca3 is not null")

    Annual_ranking_of_causes_of_death_in_the_world(df_dataCleanOut)
    Ranking_of_causes_of_death_in_each_country_each_year(df_dataCleanOut)
    Ranking_of_causes_of_death_in_each_region_each_year(df_dataCleanOut, df_Countries)
    Death_with_GDP(df_dataCleanOut, df_GDP)
    Death_Numbers_of_each_Country_each_Year(df_dataCleanOut)
    Statistics_of_population(df_population)
    Death_Rate_of_every_Entity_each_Year(df_dataCleanOut, df_population)
    year_statistics(df_dataCleanOut)
    AvgGDP_each_Death_of_each_Causes(df_dataCleanOut, df_GDP, df_population)
    Coefficient_of_Variation_of_Causes_Death_Rate(df_dataCleanOut, df_population)
    Coefficient_of_Variation_of_Causes_Death_Rate_in_Year(df_dataCleanOut, df_population)
    Growth_Rate_of_Causes(df_dataCleanOut, df_population)
  }
//  Annual ranking of causes of death in the world
  def Annual_ranking_of_causes_of_death_in_the_world(df0: DataFrame): Unit ={
    val df1 = df0
      .groupBy("Causes name", "Year")
      .agg("Death Numbers" -> "sum")
      .withColumnRenamed("sum(Death Numbers)", "Death Numbers")
    val years = df1.select("Year").distinct().collect().map(_(0)).toList
    for (year <- years){
      val df2 = df1
        .where("Year = '" + year + "'")
        .sort("Death Numbers")
      df2.coalesce(1).write.option("header", "true").csv("/home/node0/DeathNote2Result/Annual_ranking_of_causes_of_death_in_the_world/" + year)
    }
  }
//  Ranking of causes of death in each country each year
  def Ranking_of_causes_of_death_in_each_country_each_year(df0: DataFrame): Unit ={
    val cca3s = df0.select("cca3").distinct().collect().map(_(0)).toList
    for (cca3 <- cca3s){
      val df1 = df0
          .where("cca3 = '" + cca3 + "'")
          .sort(col("Year"), col("Death Numbers").desc)
      df1.coalesce(1).write.option("header", "true").csv("/home/node0/DeathNote2Result/Ranking_of_causes_of_death_in_each_country_each_year/" + cca3)
    }
  }
//  Ranking of causes of death in each region each year
  def Ranking_of_causes_of_death_in_each_region_each_year(df0: DataFrame, df_Countries: DataFrame): Unit ={
    val df1 = df0
      .select("Causes name", "cca3", "Year", "Death Numbers")
      .join(df_Countries.select("cca3", "region"), "cca3")
      .groupBy("region", "Year")
      .agg("Death Numbers" -> "sum")
      .withColumnRenamed("sum(Death Numbers)", "Death Numbers")
      .sort("Year", "region")
    val regions = df_Countries.select("region").distinct().collect().map(_(0)).toList
    for (region <- regions){
      df1
        .where("region = '" + region + "'")
        .coalesce(1)
        .write.option("header", "true")
        .csv("/home/node0/DeathNote2Result/Ranking_of_causes_of_death_in_each_region_each_year/" + region)
    }
  }
//  Death with GDP
  def Death_with_GDP(df0: DataFrame, df_GDP: DataFrame): Unit ={
      df0
        .where("cca3 is not null")
        .join(df_GDP.select("cca3", "Year", "GDP"), Seq("cca3", "Year"))
        .coalesce(1)
        .write.option("header", "true")
        .csv("/home/node0/DeathNote2Result/Death_with_GDP")
  }
//  Death Numbers of each Country each Year
  def Death_Numbers_of_each_Country_each_Year(df0: DataFrame): Unit ={
    val cca3s = df0.select("cca3").distinct().collect().map(_(0)).toList
    for (cca3 <- cca3s){
      df0.where("cca3 = '" + cca3 + "'")
        .groupBy("Year")
        .agg("Death Numbers" -> "sum")
        .withColumnRenamed("sum(Death Numbers)", "Death Numbers")
        .sort("Year")
        .coalesce(1)
        .write
        .option("header", "true")
        .csv("/home/node0/DeathNote2Result/Death_Numbers_of_each_Country_each_Year/" + cca3)
    }
  }
//  Statistics of population
  def Statistics_of_population(df0: DataFrame): Unit ={
      val pop_continent = df0.where("cca3 is null")
      val pop_country = df0.where("cca3 is not null")

      val continents = pop_continent.select("Entity").distinct().collect().map(_(0)).toList
      for (continent <- continents){
        val df1 = pop_continent.where("Entity = '" + continent + "'")
        df1.coalesce(1).write.option("header", "true").csv("/home/node0/DeathNote2Result/Statistics_of_Population/continent/" + continent)
      }

      val countries = pop_country.select("cca3").distinct().collect().map(_(0)).toList
      for (country <- countries) {
        val df1 = pop_country.where("cca3 = '" + country + "'")
        df1.coalesce(1).write.option("header", "true").csv("/home/node0/DeathNote2Result/Statistics_of_Population/country/" + country)
      }
  }
//  Death Rate of every Entity each Year
  def Death_Rate_of_every_Entity_each_Year(df0: DataFrame, df_population: DataFrame): Unit ={
    val df1 = df0
      .groupBy("cca3", "Year")
      .agg("Death Numbers" -> "sum")
      .withColumnRenamed("sum(Death Numbers)", "Death Numbers")
      .join(df_population.select("cca3", "Year", "population"), Seq("cca3", "Year"))
      .withColumn("Death Rate", col = col("Death Numbers") / col("population") * 100)
    val cca3s = df1.select("cca3").distinct().collect().map(_(0)).toList
    for (cca3 <- cca3s){
      df1.where("cca3  = '" + cca3 + "'")
        .sort("Year")
        .coalesce(1)
        .write
        .option("header", "true")
        .csv("/home/node0/DeathNote2Result/Death_Rate_of_every_Entity_each_Year/" + cca3)
    }
  }
  //  year_statistics
  def year_statistics(df0: DataFrame): Unit ={
    val years = df0.select("Year").distinct().sort(col("Year").asc).collect().map(_(0)).toList
    for (year <- years){
      df0.where("Year = '" + year + "'")
        .groupBy("Causes name")
        .agg("Death Numbers" -> "sum")
        .withColumnRenamed("sum(Death Numbers)", "Death Numbers")
        .sort("Death Numbers")
        .coalesce(1)
        .write
        .option("header", "true")
        .csv("/home/node0/DeathNote2Result/year_statistics/" + year)
    }
  }
//  AvgGDP each Deach of each Causes
  def AvgGDP_each_Death_of_each_Causes(df_dataCleanOut: DataFrame, df_GDP: DataFrame, df_population: DataFrame): Unit ={
    val CS1 = df_dataCleanOut
      .join(df_GDP.select("cca3", "Year", "GDP"), Seq("cca3", "Year"))
      .join(df_population.select("cca3", "Year", "population"), Seq("cca3", "Year"))
      .withColumn("AvgGDP", col = (col("GDP") / col("population")))
      .select("cca3", "Year", "Causes name", "Death Numbers", "AvgGDP")
      .join(df_dataCleanOut.groupBy("Causes name").agg("Death Numbers" -> "sum"), "Causes name")
      .withColumn("AvgGDP0", col = col("Death Numbers") / col("sum(Death Numbers)") * col("AvgGDP"))
      .groupBy("Causes name")
      .agg("AvgGDP0" -> "sum")
      .select("Causes name", "sum(AvgGDP0)")
      .withColumnRenamed("sum(AvgGDP0)", "AvgGDP")
      .sort("AvgGDP")
      .coalesce(1)
      .write
      .option("header", "true")
      .csv("/home/node0/DeathNote2Result/AvgGDP_each_Death_of_each_Causes")
  }

  //    Causes Stastistics -- Coefficient of Variation of Causes's Death Rate in Countries
  def Coefficient_of_Variation_of_Causes_Death_Rate(df_dataCleanOut: DataFrame, df_population: DataFrame): Unit ={
    val CS2 = df_dataCleanOut
      .join(df_population.select("cca3", "Year", "population"), Seq("cca3", "Year"))
      .withColumn("Death Rate", col = col("Death Numbers") / col("population"))
      .select("Causes name", "cca3", "Year", "Death Rate")
      .groupBy("Causes name", "Year")
      .agg("Death Rate" -> "stddev_pop", "Death Rate" -> "avg")
      .withColumn("CoV", col = col("stddev_pop(Death Rate)") / col("avg(Death Rate)"))
      .groupBy("Causes name")
      .agg("CoV" -> "avg")
      .sort(col("avg(CoV)").desc)
      .coalesce(1)
      .write
      .option("header", "true")
      .csv("/home/node0/DeathNote2Result/Coefficient_of_Variation_of_Causes_Death_Rate")
  }

//    Causes Statistics -- Coefficient of Variation of Causes's Death Rate in Year
  def Coefficient_of_Variation_of_Causes_Death_Rate_in_Year(df_dataCleanOut: DataFrame, df_population: DataFrame): Unit ={
    val CS3 = df_dataCleanOut
      .join(df_population.select("cca3", "Year", "population"), Seq("cca3", "Year"))
      .withColumn("Death Rate", col = col("Death Numbers") / col("population"))
      .select("Causes name", "cca3", "Year", "Death Rate")
      .groupBy("Causes name", "cca3")
      .agg("Death Rate" -> "stddev_pop", "Death Rate" -> "avg")
      .withColumn("CoV", col = col("stddev_pop(Death Rate)") / col("avg(Death Rate)"))
      .groupBy("Causes name")
      .agg("CoV" -> "avg")
      .sort(col("avg(CoV)").desc)
      .coalesce(1)
      .write
      .option("header", "true")
      .csv("/home/node0/DeathNote2Result/Coefficient_of_Variation_of_Causes_Death_Rate_in_Year")
  }

  //    Causes Throttling.Statistics -- Growth Rate of Causes
  def Growth_Rate_of_Causes(df_dataCleanOut: DataFrame, df_population: DataFrame): Unit ={
    val CS0 = df_dataCleanOut
      .join(df_population.select("cca3", "Year", "population"), Seq("cca3", "Year"))
      .select("Causes name", "cca3", "Year", "Death Numbers", "population")
      .groupBy("Causes name", "Year")
      .agg("Death Numbers" -> "sum", "population" -> "sum")
    val CS4 = CS0
      .join(CS0
        .withColumn("New Year", col = col("Year") + 1)
        .withColumnRenamed("sum(Death Numbers)", "sum(Death Numbers)_lastYear")
        .withColumnRenamed("sum(population)", "sum(population)_lastYear")
        .select("New Year", "Causes name", "sum(Death Numbers)_lastYear", "sum(population)_lastYear")
        .withColumnRenamed("New Year", "Year"), Seq("Causes name", "Year"))
      .withColumn("Death Rate", col = col("sum(Death Numbers)") / col("sum(population)") * 100)
      .withColumn("Death Rate_lastYear", col = col("sum(Death Numbers)_lastYear") / col("sum(population)_lastYear") * 100)
      .withColumn("delta_Death Rate", col = col("Death Rate") - col("Death Rate_lastYear"))
      .select("Causes name", "Year", "delta_Death Rate")
      .groupBy("Causes name")
      .agg("delta_Death Rate" -> "avg")
      .sort(col("avg(delta_Death Rate)").desc)
      .coalesce(1)
      .write
      .option("header", "true")
      .csv("/home/node0/DeathNote2Result/Growth_Rate_of_Causes")
  }
}
