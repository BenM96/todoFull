FROM maven as maven
WORKDIR /build
COPY . .
RUN mvn clean package
RUN ls -al target
FROM java:8
WORKDIR /app
COPY --from=maven /build/target/ToDo-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["/usr/bin/java", "-jar", "app.jar"]

